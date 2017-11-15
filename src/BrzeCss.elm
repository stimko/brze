module BrzeCss exposing (..)

import Css exposing (..)
import Css.Elements exposing (body, h1)
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
    | Introducing
    | Num
    | Steps
    | Currently
    | NumWrapper


css =
    (stylesheet << namespace "main")
        [ body
            [ padding (em 1)
            ]
        , h1
            [ fontSize (em 3)
            , padding (em 0.5)
            , borderTop3 (em 0.05) solid grey
            ]
        , class Currently
            [ fontWeight (int 500)
            , fontSize (em 0.8)
            ]
        , class NumWrapper
            [ padding2 (em 0.3) (em 0)
            ]
        , class Steps
            [ padding (em 1)
            , lineHeight (em 1.4)
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
            [ width (em 30) ]
        , class Easy
            [ fontWeight (int 200)
            , fontSize (em 1.5)
            ]
        , class Num
            [ color brzeGreen
            , fontWeight (int 500)
            , fontSize (em 1.4)
            , paddingRight (em 0.2)
            ]
        , class MakingPickupEasy
            [ fontWeight (int 200) ]
        , class Carriers
            [ color Colors.brzeGreen
            , fontWeight normal
            , whiteSpace noWrap
            ]
        , class Intro
            [ backgroundColor Colors.brzeGreen
            , color Colors.white
            , fontSize (em 1.2)
            , padding (em 1.25)
            , fontWeight (int 200)
            , children
                [ class Title
                    [ fontSize (em 2)
                    , paddingBottom (em 0.3)
                    , children
                        [ class Introducing
                            [ fontWeight (int 500) ]
                        ]
                    ]
                , class Finally
                    [ fontSize (em 1.5)
                    , fontWeight (int 200)
                    , lineHeight (em 1.3)
                    , children
                        [ class Carriers
                            [ fontSize inherit
                            , color inherit
                            , fontWeight (int 500)
                            ]
                        ]
                    ]
                ]
            ]
        ]
