---
title: Multiplayer Sequence web game
date: 2025-06-11
---

Last year, a friend and I were lamenting the lack of multiplayer web games that are easy to access and don’t force you through a tedious sign-up process (seriously, who enjoys those?). On a break from work, I thought, why not try building one myself? Fueled by an inside joke, I started prototyping a Sequence game for the web.

### Okay, cool, I got an idea—now what?

This was my first real foray into persistent connections. I kicked things off by sketching out a proof of concept for the connection flow, which meant diving headfirst into the world of realtime protocols.

My first stop was **Server Sent Events (SSE)**, a uni-directional protocol that lets a central server push events to a client. It sounded promising, but I quickly realized its limitations: clients would have to send data back via regular HTTP POST requests, and then somehow keep their state in sync with the events coming from the server. Managing both at once just felt clunky—especially for a game where low-latency, bi-directional communication is essential.

Next up: **gRPC**. On paper, gRPC looked like a dream—fast, efficient, and with built-in support for streaming. I was intrigued by its use of HTTP/2 and protocol buffers, which promised smaller payloads and better performance. But as I dug deeper, the cracks started to show. Browser support for gRPC is still pretty limited, and while there are workarounds (like gRPC-Web), they add extra layers of complexity. The developer experience for real-time browser games just isn’t as smooth as you’d hope. Plus, setting up proto files and dealing with code generation felt like overkill for a hobby project that needed to stay nimble and easy to iterate on. If I were building a large-scale, production-grade system, gRPC might have been worth the investment—but for this, it was just too much ceremony.

Finally, I landed on **WebSockets**—and honestly, it just clicked. Since this was a hobby project, I could package the backend into a single machine and have it handle all socket connections. WebSockets made it natural to broadcast events to all clients from the server, like a dungeon master guiding the flow of a campaign. The server became the single source of truth, and I could push updates to all connected players in real time. The API was straightforward, the latency was low, and the developer experience was genuinely fun.

### Writing the Code

Building the frontend was refreshingly straightforward. Given the simplicity of the UI, I decided to use Svelte—everyone was raving about it at the time, and I wanted to see what the hype was about. The developer experience was great: all the static stuff (HTML and CSS) lived in a single file, and I could easily hook up elements to functions, making them stateful. Composition was clean and readable (React could take a few notes here).

The main game logic involved rendering a 10x10 grid of cards and creating a hand component for the player to use on their turn. I debated between using static images or custom components for the cards. Static images would have allowed for more stylized designs, but if you’ve done any web dev, you know how tricky it is to make those responsive. So, I kept it simple: card components displaying ranks and suits via props, each with a unique ID.

I also added a basic connection screen to let players create or join a game. It would print out a unique ID, which you could share with friends to get them into your session.

The game loop itself was pretty simple: on a player’s turn, the server would start a timer. The player could place a card, sending the x,y coordinates to the server via the socket connection. The server would then broadcast the move to all players and announce whose turn was next. Rinse and repeat until either:

1. A sequence is formed
2. The deck runs out of cards

I’ll admit, I left the project unfinished at step 1 because I got busy with other things—so the code still lacks a win check at the end of each turn. Maybe one day I’ll circle back and finish it up.

### Deployment

Nothing fancy here: I used Netlify for the frontend and a free-tier EC2 instance to host the backend, all set up with CI/CD pipelines for easy updates.

### Conclusion

If you’re curious or want to check out the code, you can find the full repository [here](https://github.com/ramenguy21/sequence-game). If you have thoughts, feedback, or want to contribute, feel free to reach out or open an issue. Maybe together we’ll finally get that win check implemented!
