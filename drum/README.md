# Survey

This frontend project is to use the skills learned at FreeCodeCamp.

The stories from this project are listed on [FreeCodeCamp](https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-drum-machine/).

Below I've listed them incase that changes;

1. User Story #1: I should be able to see an outer container with a corresponding `id="drum-machine"` that contains all other elements.
1. User Story #2: Within `#drum-machine` I can see an element with a corresponding `id="display"`.
1. User Story #3: Within `#drum-machine` I can see 9 clickable drum pad elements, each with a class name of drum-pad, a unique id that describes the audio clip the drum pad will be set up to trigger, and an inner text that corresponds to one of the following keys on the keyboard: `Q`, `W`, `E`, `A`, `S`, `D`, `Z`, `X`, `C`. The drum pads MUST be in this order.
1. User Story #4: Within each `.drum-pad`, there should be an HTML5 audio element which has a src attribute pointing to an audio clip, a class name of clip, and an id corresponding to the inner text of its parent .drum-pad (e.g. `id="Q"`, `id="W"`, `id="E"` etc.).
1. User Story #7: When a `.drum-pad` is triggered, a string describing the associated audio clip is displayed as the inner text of the #display element (each string must be unique).
1. User Story #5: When I click on a `.drum-pad` element, the audio clip contained in its child audio element should be triggered.
1. User Story #6: When I press the trigger key associated with each `.drum-pad`, the audio clip contained in its child audio element should be triggered (e.g. pressing the Q key should trigger the drum pad which contains the string "Q", pressing the W key should trigger the drum pad which contains the string "W", etc.).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Nodejs
- Git

### Installing

A step by step series of examples that tell you have to get a development env running

Clone the repo, `https://gitlab.com/jacebenson/fcc-drummachine.git`

```sh
git clone https://gitlab.com/jacebenson/fcc-drummachine.git
```

Install the required dependencies

```sh
cd fcc-survey
npm install
```

To get this repo hosting I've included a npm script to spin up a server with this command;

```sh
npm start
```

## Development

## Deployment

This deploy's to gitlab today with gitlab pages.
So all that's needed is the content of the page needs to exist in `/public`.

## Built With

- [Bootstrap](http://getbootstrap.com/)
- [FontAwesome](http://fortawesome.github.io/Font-Awesome/)
- [jQuery](http://jquery.com/)

## Contributing

I don't know why'd you'd want to contribute but if you do or want to see if the pull is wanted open a Issue.

## Authors

Jace Benson