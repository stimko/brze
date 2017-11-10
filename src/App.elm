module App exposing (..)

import BrzeCss
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.CssHelpers exposing (withNamespace)
import Html.Events exposing (..)
import Json.Decode


{ id, class, classList } =
    withNamespace "main"


type alias Model =
    { counter : Int }


init : ( Model, Cmd Msg )
init =
    ( Model 0, Cmd.none )


decodeModel : Json.Decode.Decoder Model
decodeModel =
    Json.Decode.map Model
        (Json.Decode.field "counter" Json.Decode.int)


type Msg
    = Inc


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        Inc ->
            { model | counter = model.counter + 1 } ! []


num : String -> Html Msg
num n =
    span [ class [ BrzeCss.Num ] ] [ text n ]


oneTwoThree : Html Msg
oneTwoThree =
    p [ class [ BrzeCss.Easy ] ]
        [ p [ class [ BrzeCss.VerticalBrze ] ] [ text "Brze" ]
        , p []
            [ text "It’s as simple as 1, 2, 3!"
            , div []
                [ num "1"
                , span [] [ text "TEXT US at 848.702.3698" ]
                ]
            , div []
                [ num "2"
                , span [] [ text "We come and pickup yur packages*" ]
                ]
            , div []
                [ num "3"
                , span [] [ text "We text you a confirmation that inclides an image and tracking number after delivery" ]
                ]
            ]
        ]


view : Model -> Html Msg
view model =
    div []
        [ img
            [ class [ BrzeCss.BrzeLogo ]
            , src "./images/brze.png"
            ]
            []
        , h1 []
            [ span [ class [ BrzeCss.MakingPickupEasy ] ] [ text "Making pickup easy! " ]
            , span [ class [ BrzeCss.Carriers ] ] [ text "FedEx • USPS • UPS" ]
            ]
        , p [ class [ BrzeCss.Intro ] ]
            [ p [ class [ BrzeCss.Title ] ]
                [ span [] [ text "Introducing Brze. " ]
                , span [ class [ BrzeCss.ReturnsMadeEasy ] ] [ text "Returns Made Easy!" ]
                ]
            , p [ class [ BrzeCss.Finally ] ]
                [ text "Finally, an affordable service that will pick up your package/s from your home and drop them off at "
                , span [ class [ BrzeCss.Carriers ] ] [ text "FedEx, USPS, or UPS." ]
                ]
            ]
        , oneTwoThree
        ]
