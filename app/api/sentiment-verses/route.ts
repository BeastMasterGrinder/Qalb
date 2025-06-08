import { NextRequest, NextResponse } from 'next/server';
import { getRandomVersesBySentiment } from '@/lib/actions/SentimentVerses';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sentiment = searchParams.get('sentiment');
    const limit = parseInt(searchParams.get('limit') || '3', 10);

    if (!sentiment) {
      return NextResponse.json({ 
        error: 'Sentiment parameter is required' 
      }, { status: 400 });
    }

    const results = await getRandomVersesBySentiment(sentiment, limit);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching sentiment verses:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch verses' 
    }, { status: 500 });
  }
} 