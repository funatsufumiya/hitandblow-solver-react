# Hit and Blow Solver

![screenshot](screenshot.jpg)

- React App
- TypeScript
- Solver code (currently just `Solver.ts`) and React App is independent
- [Jest](https://jestjs.io/) based test cases

## Usage

- `npm start`
    - Server start on localhost:3000
- `npm run test`
    - Run test cases
- `npm run build`
    - Build static pages

## Algorithm

- On each move, reject patterns which does not match the current move (color set, hit and blow)

## TODO

- Choice assistence of the best move (scoring each moves and looking moves ahead)
- Displaying more info about pattenrs (color appearance rate, occupation rate, etc.) 

## License

MIT License