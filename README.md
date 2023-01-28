# Drinctet

## Glossary

A card is a data entry that provides information to be displayed.

A "slide" in Drinctet is a visual representation that calls for an action from the users. Slides may use cards, but they don't have to.

## Cards

### DareCard

`{player1}` is selected by the slide, so it can be referred to. Be careful, if you want to refer to other players, start with `{player2}`.

## Interpolated text rules

Indexes start at 1 (so the first player is player 1 which sounds more natural). If no index is given, this default index will be used.

Markup:

| Definition                        | Description                                                                                                                                                                  | Example                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `{player(1-9)?}`                  | Mentions a player in a text. If used in a card which has a player selected by default (e. g. `TruthCard` or `DareCard`), this default player will be `player1`               | `{player}, please slap {player2}`                                                      |
| `{sips(1-9)?(:min)?}`             | Generates a random amount of sips and uses the correct plural/singular version of sip.  With a colon can be a minimum amount of sips be given.                               | `{player} drink {sips} or if you dont want to drink {sips}, give {sips2} to {player2}` |
| `{male version / female version}` | Gender a part of the text. If the last mentioned player is a male, the first option will be used, else the second one. Especially useful for gendered languages like german. | `{player} is a {boy/girl}. Lecke [player2] an. {Er/Sie} gehört jetzt dir ;)`           |
| `[option 1\|option 2\| ....]`     | Select a random option to make cards more varied.                                                                                                                            | `What is the capital of [Germany\|Netherlands\|United Kindgom]`                        |
| `[a-z]`                           | Select a random letter between a-z.                                                                                                                                          | `{player}, tell us a city starting with [a-z]. If you can name one, drink {sips}`      |
| `[(0-9)-(0-9)]`                   | Select a random number between min and max, both inclusive.                                                                                                                  | `{player}, behave like a chicken for [2-5] minutes`                                    |
