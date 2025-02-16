const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Configure paths
const dbPath = path.join(process.cwd(), 'quran-verses.db');
const dataPath = path.join(process.cwd(), 'labeled_verses.json'); // Changed to your data file

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to Quran verses database');
});

// Create table with the new schema
db.serialize(() => {
  // Drop existing table if needed
  db.run('DROP TABLE IF EXISTS segmented_verses');
  
  // Create new table with correct schema
  db.run(`CREATE TABLE segmented_verses (
    verse_key TEXT PRIMARY KEY,
    verse_text TEXT NOT NULL,
    sentiment TEXT NOT NULL,
    anger_percent REAL NOT NULL,
    fear_percent REAL NOT NULL,
    joy_percent REAL NOT NULL,
    sadness_percent REAL NOT NULL
  )`);

  // Create index on sentiment for efficient grouping
  db.run('CREATE INDEX idx_sentiment ON segmented_verses(sentiment)');

  // Read and parse the labeled verses file
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const versesData = JSON.parse(rawData);

  // Prepare the insert statement
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO segmented_verses (
      verse_key,
      verse_text,
      sentiment,
      anger_percent,
      fear_percent,
      joy_percent,
      sadness_percent
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // Process each sentiment category
  ['joy', 'anger', 'sadness', 'fear'].forEach(sentiment => {
    const verses = versesData[sentiment] || [];
    
    verses.forEach(verse => {
      insertStmt.run(
        verse.verse_key,
        verse.en_verse_text,
        sentiment,
        verse.sentiments.anger.$numberDouble,
        verse.sentiments.fear.$numberDouble,
        verse.sentiments.joy.$numberDouble,
        verse.sentiments.sadness.$numberDouble
      );
    });
  });

  // Finalize and close
  insertStmt.finalize(err => {
    if (err) {
      console.error('Error inserting verses:', err);
    } else {
      // Get the total count of inserted verses
      db.get('SELECT COUNT(*) as count FROM segmented_verses', (err, row) => {
        if (err) console.error('Error getting count:', err);
        else console.log(`Successfully inserted ${row.count} verses`);
        db.close();
      });
    }
  });
});