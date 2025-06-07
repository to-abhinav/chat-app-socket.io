
# Real-Time Chat App with Next.js and Socket.IO

A simple real-time chat application built with Next.js, React, and Socket.IO. Users can join chat rooms, send messages, and receive messages from other users in real time.

---

## Features

- Join or create chat rooms with a custom room name
- Real-time messaging between multiple users in the same room
- Display system messages when users join a room
- User-friendly chat interface with message sender identification
- Responsive design with Tailwind CSS styling

---

## Tech Stack

- [Next.js](https://nextjs.org/) (React framework)
- [Socket.IO](https://socket.io/) for real-time WebSocket communication
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/to-abhinav/chat-app-socket.io.git
   cd chat-app-socket.io
   ```
   
2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server

   ```bash
   npm run dev:socket 
   # or
   yarn dev
   ```

4. Open your browser and visit `http://localhost:3000`

---

## Usage

1. Enter a **username** and **room name** to join or create a chat room.
2. Send messages and see messages from other users in the room in real time.
3. System messages notify when a user joins the room.

---

## Project Structure

* `/pages` - Next.js page components
* `/components` - React components like `Chatform` and `ChatMessage`
* `/lib` - Socket client setup
* `server.mts` - Custom Node.js server with Socket.IO integration

---

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contact

Created by Abhinav Tomar – [GitHub Profile](https://github.com/to-abhinav)

```


