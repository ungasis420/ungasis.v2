// RiftCoach graph traversal examples. These are examples for future Neo4j/Cypher-style migration.

// 1. Direct neighborhood for a champion
MATCH (c:Champion {id: $champion_id})-[r]-(n)
WHERE r.patch_version = $patch_version
RETURN c, r, n
LIMIT 100;

// 2. Karma support enchanter reasoning path
MATCH path = (c:Champion {id: 'karma'})-[:HAS_ABILITY]->(a:Ability)-[:HAS_EFFECT]->(e:Effect)<-[:HAS_EFFECT|SYNERGIZES_WITH*1..2]-(x)
WHERE coalesce(x.patch_version, '7.1e') = '7.1e'
RETURN path
LIMIT 50;

// 3. Counterplay options for a threat/effect
MATCH path = (answer)-[r:DENIES|MITIGATES|COUNTERS]->(threat:Effect {id: $effect_id})
WHERE r.confidence_overall >= $confidence_min
RETURN path, r.reason_codes, r.source_status
ORDER BY r.confidence_overall DESC
LIMIT 25;

// 4. Source claim support for a numeric value
MATCH (entity)-[:HAS_FIELD]->(field)-[:SUPPORTED_BY]->(claim:SourceClaim)-[:SOURCE_SUPPORTS]->(source:Source)
WHERE entity.id = $entity_id
RETURN field, claim, source;

// 5. Patch impact map
MATCH path = (p:Patch {version: $patch_version})<-[:CHANGED_IN_PATCH]-(entity)-[*1..2]-(affected)
RETURN path
LIMIT 100;
