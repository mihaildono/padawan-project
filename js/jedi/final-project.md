# Final Project - Full Stack Snake Game

> "I am ready to face the Trials."
> ―Obi-Wan Kenobi

It is time to put it all together and create a project that is worthy to be put
in your portfolio. This is your capstone project - a demonstration of everything
you've learned throughout the Padawan Project.

## Project Overview

Build a **multiplayer Snake game** with modern web technologies. This project will
showcase your full-stack development skills, including front-end, back-end,
database management, real-time communication, authentication, testing, and deployment.

## Core Requirements

### Front-End (React)

- **Game Board** - Render the snake, food, and obstacles
- **Real-time Updates** - Smooth movement using WebSocket connection
- **Game Controls** - Keyboard input for snake direction (arrow keys or WASD)
- **Game States** - Menu, playing, paused, game over
- **Scoreboard Display** - Show current score and top 10 global scores
- **Responsive Design** - Works on desktop and tablet (mobile optional)
- **Visualization** - Use Canvas API, SVG, or a library like Konva.js/PixiJS

### Back-End (Node.js + Express)

- **REST API** for:
  - User authentication (register, login, logout)
  - Fetching leaderboard
  - User profile management
  - Game statistics
- **WebSocket Server** for:
  - Real-time game state updates
  - Snake movement
  - Food spawning
  - Collision detection
- **Game Engine Logic**:
  - Snake movement and growth
  - Collision detection (walls, self, obstacles)
  - Food generation
  - Score calculation

### Database (SQL)

- **Users Table**:
  - id, username, email, password (hashed), created_at
- **Games Table**:
  - id, user_id, score, duration, created_at
- **Leaderboard View/Query**:
  - Top 10 users by highest score
  - Include username and score

### Authentication

- Email/password registration and login
- **Bonus:** OAuth integration (Google/Facebook)
- Password hashing (bcrypt)
- Session management or JWT tokens
- Protected routes (must be logged in to play)

### Testing

- **Unit Tests**:
  - Game logic (snake movement, collision detection, scoring)
  - API endpoints
  - Utility functions
- **Integration Tests**:
  - User registration and login flow
  - Game creation and score submission
  - Leaderboard retrieval
- **Minimum 70% code coverage**

### Deployment

- Deploy to a cloud platform:
  - Front-end: Vercel, Netlify, or similar
  - Back-end: Render, Railway, Heroku, or similar
  - Database: PostgreSQL on Render/Railway or similar
- Include deployment URL in README
- Configure environment variables properly
- Ensure CORS is configured correctly

## Creative Features (Choose at Least 2)

Make the game your own by adding unique features:

- **Power-ups** - Special food items (speed boost, invincibility, extra points)
- **Obstacles** - Walls or barriers that appear during gameplay
- **Difficulty Levels** - Easy, Medium, Hard (affects speed)
- **Multiple Game Modes**:
  - Classic (hit wall = game over)
  - Wrap-around (teleport to opposite side)
  - Survival (time-based)
  - Multiplayer (compete with others in real-time)
- **Themes** - Different visual styles or color schemes
- **Sound Effects** - Eating food, game over, background music
- **Achievements** - Unlock badges for milestones (first 100 points, 10 games played, etc.)
- **AI Opponent** - Play against computer-controlled snake

## Technical Specifications

### Project Structure

```
snake-game/
├── client/                 # React front-end
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API and WebSocket services
│   │   ├── styles/        # CSS/styled-components
│   │   └── utils/         # Helper functions
│   └── package.json
├── server/                # Node.js back-end
│   ├── src/
│   │   ├── routes/        # Express routes
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # Database models
│   │   ├── middleware/    # Auth, error handling
│   │   ├── game/          # Game engine logic
│   │   └── websocket/     # WebSocket handlers
│   └── package.json
├── database/
│   └── schema.sql         # Database schema
└── README.md              # Project documentation
```

### Technologies

**Required:**

- React (with Hooks)
- Node.js + Express
- WebSockets (ws or Socket.io)
- PostgreSQL or MySQL
- Jest for testing
- bcrypt for password hashing

**Recommended:**

- TypeScript (bonus points!)
- React Testing Library
- JWT for authentication
- dotenv for environment variables

## Timeline

This project typically takes 2-4 weeks:

**Week 1:** Planning and setup

- Design database schema
- Set up project structure
- Create basic React components
- Set up Express server

**Week 2:** Core functionality

- Implement game engine logic
- Build WebSocket communication
- Create REST API endpoints
- Add authentication

**Week 3:** Polish and features

- Add creative features
- Implement testing
- Style the UI
- Fix bugs

**Week 4:** Testing and deployment

- Achieve test coverage goals
- Deploy to production
- Write documentation
- Final testing

## Success Criteria

Your project is complete when it has:

✅ All core requirements implemented
✅ At least 2 creative features
✅ 70%+ test coverage
✅ Deployed and accessible via URL
✅ Comprehensive README with:

- Project description
- Setup instructions
- API documentation
- Screenshots/GIFs
- Technologies used
- Live demo link

✅ Clean, well-organized code
✅ No critical bugs

## Bonus Challenges

- **Multiplayer Mode** - Multiple snakes in same game
- **Replay System** - Save and replay games
- **Tournament Mode** - Bracket-style competitions
- **Admin Dashboard** - Manage users and view statistics
- **Mobile App** - React Native version
- **CI/CD Pipeline** - Automated testing and deployment

## Resources

- [WebSocket Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [JWT Authentication](https://jwt.io/introduction)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Submission

When finished with the trial:

1. Push your code to GitHub (separate repositories for client/server or monorepo)
2. Deploy your application
3. Create a comprehensive README
4. Add the project to your portfolio
5. Head over to the [epilogue][epilogue] for interview preparation and next steps

**Badge:** Jedi Master

Congratulations, Jedi! May the Force be with you in your development career.

[epilogue]: https://github.com/mihaildono/padawan-project/blob/master/js/epilogue/interview-training.md
