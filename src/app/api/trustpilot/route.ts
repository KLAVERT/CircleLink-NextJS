import { NextResponse } from 'next/server';

// Note: This is a simplified example. In a production environment, you would:
// 1. Use Trustpilot's API with proper authentication
// 2. Implement caching to avoid rate limits
// 3. Include error handling and logging

export async function GET() {
  try {
    // In a real implementation, you would:
    // 1. Make an authenticated request to Trustpilot's API
    // 2. Process and format the response
    // const trustpilotApiKey = process.env.TRUSTPILOT_API_KEY;
    // const businessUnitId = process.env.TRUSTPILOT_BUSINESS_UNIT_ID;
    // const response = await fetch(`https://api.trustpilot.com/v1/business-units/${businessUnitId}/reviews?apiKey=${trustpilotApiKey}`);
    // const data = await response.json();
    
    // For demonstration purposes, return mock data
    const mockReviews = [
      {
        id: '1',
        name: 'John Doe',
        date: '2023-12-15',
        rating: 5,
        title: 'Excellent service!',
        content: 'The server has been running flawlessly. Great customer support as well!'
      },
      {
        id: '2',
        name: 'Alice Smith',
        date: '2023-11-28',
        rating: 4,
        title: 'Good experience overall',
        content: 'Easy setup and good performance. Would recommend to others looking for game servers.'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        date: '2023-10-10',
        rating: 5,
        title: 'Best Ark server provider',
        content: 'We switched from another provider and couldn\'t be happier. The performance is amazing!'
      },
      {
        id: '4',
        name: 'Eva Williams',
        date: '2023-09-22',
        rating: 5,
        title: 'Great value for money',
        content: 'Excellent performance, easy setup, and the customer support is top-notch. Highly recommended!'
      },
      {
        id: '5',
        name: 'Michael Brown',
        date: '2023-09-05',
        rating: 4,
        title: 'Reliable service',
        content: 'Server has been running without issues for months. Only giving 4 stars because the dashboard could be more intuitive.'
      }
    ];

    return NextResponse.json({ reviews: mockReviews });
  } catch (error) {
    console.error('Error fetching Trustpilot reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
} 