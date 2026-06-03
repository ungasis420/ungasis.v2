// test-api.mjs — v2 (raw stream debug)
const BASE_URL = 'http://localhost:3000';

async function testChat(question) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`📝 ${question}`);
  console.log('═'.repeat(60));

  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: question }],
    }),
  });

  console.log(`📡 ${res.status} ${res.statusText}`);

  if (!res.ok) {
    console.error('❌', await res.text());
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullRaw = '';
  let chunks = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    fullRaw += chunk;
    chunks++;
  }

  // Show first 2000 chars of raw stream to understand the format
  console.log('\n📦 Raw stream (first 2000 chars):');
  console.log('─'.repeat(40));
  console.log(fullRaw.slice(0, 2000));
  console.log('─'.repeat(40));

  // Try to extract text from common AI SDK formats
  let extracted = '';
  const lines = fullRaw.split('\n');
  
  for (const line of lines) {
    // Format 1: AI SDK v4 data stream — 0:"text"
    if (/^\d+:/.test(line)) {
      const colonIdx = line.indexOf(':');
      const prefix = line.slice(0, colonIdx);
      const payload = line.slice(colonIdx + 1);
      if (prefix === '0') {
        try {
          extracted += JSON.parse(payload);
        } catch { /* skip */ }
      }
    }
    // Format 2: SSE — data: {"text":"..."}
    if (line.startsWith('data: ') && !line.includes('[DONE]')) {
      try {
        const obj = JSON.parse(line.slice(6));
        if (obj.choices?.[0]?.delta?.content) {
          extracted += obj.choices[0].delta.content;
        }
        if (obj.text) extracted += obj.text;
      } catch { /* skip */ }
    }
  }

  console.log(`\n📊 Stats: ${chunks} chunks, ${fullRaw.length} raw bytes`);
  
  if (extracted.length > 0) {
    console.log(`\n🤖 Extracted text (${extracted.length} chars):`);
    console.log('─'.repeat(40));
    console.log(extracted.slice(0, 3000));
    console.log('─'.repeat(40));
  } else {
    console.log('\n⚠️  Could not extract text. Check raw stream above.');
  }
}

async function main() {
  console.log('🚀 RiftCoach API Test v2');
  console.log(`⏰ ${new Date().toLocaleString()}\n`);

  await testChat('What is the best build for Karma support?');

  console.log('\n🏁 Done!');
}

main();