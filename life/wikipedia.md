The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.[1]

The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced "players", by creating patterns with particular properties. The Game has been reprogrammed multiple times in various coding languages.

## Rules

The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead, or "populated" or "unpopulated". Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

 - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 - Any live cell with two or three live neighbours lives on to the next generation.
 - Any live cell with more than three live neighbours dies, as if by overpopulation.
 - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed—births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations.

## Origins

John von Neumann has defined life (despite his careful disclaimers)[which?] in late 1940 as a creation (as a being or organism) which 1. can reproduce itself, and 2. can simulate a Turing machine. John von Neumann was thinking about an engineering solution which would use electromagnetic components floating randomly in liquid (or gas).[citation needed] This turned out not to be realistic at the given technology state of those days. Thus, ingeniously, Stanisław Ulam invented the cell automata which in principle were supposed to simulate von Neumann's potential electro-magnetic constructions. Ulam discussed his cell automata in 2-dimensional lattice, in several papers; he applied the early computers to do so. In parallel, John von Neumann attempted to construct Ulam's cellular automaton. He virtually succeeded.[clarification needed] He was busy with his other projects, thus, he left some details unfinished. His construction was complicated because it tried to simulate his own engineering design. Over time, simpler life constructions were provided by other researchers, and published in papers and books.[citation needed]

The initial goal of John Conway was to define an interesting and unpredictable cell automaton. Thus, he wanted some configurations to last for a long time before dying, other configurations to go on forever without allowing cycles, etc. It was a significant challenge and an open problem for years before experts on cell automatons managed to prove that indeed, Conway' LIFE game admitted a configuration which was *alive* in the sense of satisfying the two John von Neumann's general axioms of life, mentioned above.

While the definitions before Conway's LIFE were proof-oriented, Conway's construction simply aimed at simplicity without a priori aiming at the proof of automaton being alive.

The game made its first public appearance in the October 1970 issue of Scientific American, in Martin Gardner's "Mathematical Games" column. From a theoretical point of view, it is interesting because it has the power of a universal Turing machine: that is, anything that can be computed algorithmically can be computed within Conway's Game of Life.[2][3] Gardner wrote:

    The game made Conway instantly famous, but it also opened up a whole new field of mathematical research, the field of cellular automata ... Because of Life's analogies with the rise, fall and alterations of a society of living organisms, it belongs to a growing class of what are called "simulation games" (games that resemble real life processes).

Ever since its publication, Conway's Game of Life has attracted much interest, because of the surprising ways in which the patterns can evolve. Life provides an example of emergence and self-organization. Scholars in various fields, such as computer science, physics, biology, biochemistry, economics, mathematics, philosophy, and generative sciences have made use of the way that complex patterns can emerge from the implementation of the game's simple rules[citation needed]. The game can also serve as a didactic analogy, used to convey the somewhat counterintuitive notion that "design" and "organization" can spontaneously emerge in the absence of a designer. For example, philosopher and cognitive scientist Daniel Dennett has used the analogy of Conway's Life "universe" extensively to illustrate the possible evolution of complex philosophical constructs, such as consciousness and free will, from the relatively simple set of deterministic physical laws, which might govern our universe.[4][5][6]

The popularity of Conway's Game of Life was helped by its coming into being just in time for a new generation of inexpensive computer access which was being released into the market. The game could be run for hours on these machines, which would otherwise have remained unused at night. In this respect, it foreshadowed the later popularity of computer-generated fractals. For many, Life was simply a programming challenge: a fun way to use otherwise wasted CPU cycles. For some, however, Life had more philosophical connotations. It developed a cult following through the 1970s and beyond; current developments have gone so far as to create theoretic emulations of computer systems within the confines of a Life board.[7][8]

Conway chose his rules carefully, after considerable experimentation, to meet these criteria:

 - There should be no explosive growth.
 - There should exist small initial patterns with chaotic, unpredictable outcomes.
 - There should be potential for von Neumann universal constructors.
 - The rules should be as simple as possible, whilst adhering to the above constraints.[9]

## Examples of patterns

The earliest interesting patterns in the Game of Life were discovered without the use of computers. The simplest static patterns ("still lifes") and repeating patterns ("oscillators"—a superset of still lifes) were discovered while tracking the fates of various small starting configurations using graph paper, blackboards, physical game boards (such as Go) and the like. During this early research, Conway discovered that the R-pentomino failed to stabilize in a small number of generations. In fact, it takes 1103 generations to stabilize, by which time it has a population of 116 and has fired six escaping gliders[10] (these were the first gliders ever discovered).[11]

Many different types of patterns occur in the Game of Life, including still lifes, oscillators, and patterns that translate themselves across the board, including the glider, discovered by Richard K. Guy in 1970, and several kinds of spaceships. Some frequently occurring[12] [13] examples of these three classes are shown below, with live cells shown in black, and dead cells shown in white.

### Still life

| Block | Beehive | Loaf | Boat | Tub |
| ----- | ------- | ---- | ---- | --- |
| ![](./wikipedia/block.png) | ![](./wikipedia/beehive.png) | ![](./wikipedia/loaf.png) | ![](./wikipedia/boat.png) | ![](./wikipedia/tub.png)     |

### Oscillators

| Blinker | Toad | Beacon | Pulsar | Pentadecathlon | 
| ------- | ---- | ------ | ------ | -------------- |
| ![](./wikipedia/blinker.gif) | ![](./wikipedia/toad.gif) | ![](./wikipedia/beacon.gif) | ![](./wikipedia/pulsar.gif) | ![](./wikipedia/pentadecathlon.gif) | 

### Spaceships 
| Glider | Lightweight spaceship |
| ------ | --------------------- | 
| ![](./wikipedia/glider.gif) | ![](./wikipedia/LWSS.gif) |