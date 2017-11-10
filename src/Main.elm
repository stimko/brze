module Main exposing (main)

import App exposing (init, update, view)
import Html


main : Program Never App.Model App.Msg
main =
    Html.program
        { init = init
        , update = update
        , view = view
        , subscriptions = always Sub.none
        }
