# API Service

## Usage

```typescript
import { apiClient } from '@/services/api'

// GET request
const response = await apiClient.get('/users')
const users = response.data

// POST request
const response = await apiClient.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
})

// PUT request
const response = await apiClient.put('/users/1', {
  name: 'Jane Doe'
})

// DELETE request
await apiClient.delete('/users/1')
```

## Configuration

Set environment variables in `.env`:

```env
VITE_APP_API_URL=http://localhost:8000/api
VITE_APP_MODE=local
```

## Features

- Automatic token injection from localStorage
- Telegram auth header support
- Error handling with notifications
- Automatic redirects for maintenance and 401 errors
- TypeScript support
