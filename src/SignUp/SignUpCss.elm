module SignUp.SignUpCss exposing (..)

import Css exposing (..)
import Css.Elements exposing (body, h1)
import Css.Namespace exposing (namespace)
import SharedStyles.Colors as Colors exposing (..)


type CssClasses
    = InputWrapper


css =
    (stylesheet << namespace "signUp")
        [ class InputWrapper
            [ padding (em 1)
            ]
        ]
