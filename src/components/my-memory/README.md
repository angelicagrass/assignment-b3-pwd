<my-memory>

## Methods

### startGameTable
Set up the game table and prepares for the game.


### compareCards
Checkas if theres two cards flipped. Adds a classList "hide" if they match so the cards disappears from the game table.


### arrayOfImages
Creates the custom element My-card with picture from the array depending on how large game the client has choosen.


### resetMemory
Lets the user reset the memeory if they like to try again without reloading the application.


Styling with CSS


Example
<my-memory></my-memory>


<my-card>

## Attributes

### `makethespin`
The `makethemspin` attribute, if present, makes the cards that are flipped with front up flip back.

### `activediv`
The `activediv` attribute, is the current game id.


## Methods

### unflipCards
Flips the cards by removing the class selected with a timeout of 2 seconds.


Styling with CSS


Example
<my-card></my-card>