module BrzeCss exposing (..)

import Css exposing (..)
import Css.Elements exposing (h1)
import Css.Namespace exposing (namespace)
import SharedStyles.Colors as Colors exposing (..)


type CssClasses
    = BrzeLogo
    | VerticalBrze
    | Easy
    | MakingPickupEasy
    | Intro
    | Title
    | Carriers
    | Finally
    | ReturnsMadeEasy
    | Num


css =
    (stylesheet << namespace "main")
        [ h1
            [ fontSize (em 2)
            , padding (em 1)
            , borderTop3 (em 0.05) solid grey
            ]
        , class VerticalBrze
            [ backgroundColor black
            , padding2 (em 0.4) (em 0.2)
            , fontWeight (int 500)
            , fontSize (em 3)
            , float right
            , color white
            , property "text-orientation" <| "sideways"
            , property "writing-mode" <| "vertical-rl"
            ]
        , class BrzeLogo
            [ width (em 25) ]
        , class Easy
            [ fontWeight (int 200)
            , fontSize (em 1.5)
            ]
        , class Num
            [ color brzeGreen
            , fontWeight bold
            ]
        , class MakingPickupEasy
            [ fontWeight (int 200) ]
        , class Carriers
            [ color Colors.brzeGreen
            , fontWeight normal
            ]
        , class Intro
            [ backgroundColor Colors.brzeGreen
            , color Colors.white
            , padding (em 1.8)
            , children
                [ class Title
                    [ fontSize (em 2)
                    , paddingBottom (em 0.3)
                    , children
                        [ class ReturnsMadeEasy
                            [ fontWeight (int 100) ]
                        ]
                    ]
                , class Finally
                    [ fontSize (em 1.5)
                    , fontWeight (int 100)
                    , children
                        [ class Carriers
                            [ fontSize inherit
                            , color inherit
                            , fontWeight normal
                            ]
                        ]
                    ]
                ]
            ]
        ]
