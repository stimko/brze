module SignUp.SignUpCss exposing (..)

import Css exposing (..)
import Css.Elements exposing (body, h1, input)
import Css.Namespace exposing (namespace)
import SharedStyles.Colors as Colors exposing (..)


type CssClasses
    = InputWrapper
    | Input
    | SignUpButton
    | SignUp
    | SignUpTitle


css =
    (stylesheet << namespace "signUp")
        [ class SignUpTitle
            [ fontSize (em 2)
            ]
        , class SignUp
            [ borderTop3 (em 0.05) solid grey
            , padding (em 2)
            ]
        , class Input
            [ padding (em 0.2)
            , fontSize (em 1.5)
            ]
        , class InputWrapper
            [ paddingTop (em 1)
            , fontSize (em 1.5)
            ]
        , class SignUpButton
            [ width (px 110)
            , height (px 50)
            , backgroundColor black
            , fontFamily inherit
            , color white
            , fontSize (em 1.3)
            , border (em 0)
            , marginTop (em 1)
            ]
        ]
