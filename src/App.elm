module App exposing (..)

import BrzeCss
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.CssHelpers exposing (withNamespace)
import Json.Decode exposing (Decoder, string, bool)
import Json.Decode.Pipeline exposing (decode, hardcoded, optional, required)
import SignUp.SignUp exposing (..)


{ id, class, classList } =
    withNamespace "main"


type Msg
    = SignUp SignUpMsg


type alias Model =
    { signUp : SignUpModel }


userDecoder : Decoder SignUpModel
userDecoder =
    decode SignUpModel
        |> Json.Decode.Pipeline.required "email" string
        |> Json.Decode.Pipeline.required "phoneNumber" string
        |> Json.Decode.Pipeline.required "name" string
        |> Json.Decode.Pipeline.required "zip" string
        |> Json.Decode.Pipeline.required "city" string
        |> Json.Decode.Pipeline.required "address1" string
        |> Json.Decode.Pipeline.optional "address2" string ""
        |> Json.Decode.Pipeline.required "password1" string
        |> Json.Decode.Pipeline.required "password2" string
        |> Json.Decode.Pipeline.required "signedUp" bool
        |> Json.Decode.Pipeline.required "submitDisabled" bool
        |> Json.Decode.Pipeline.required "signedUpErr" string


decodeModel : Decoder Model
decodeModel =
    decode Model |> Json.Decode.Pipeline.required "signUp" userDecoder


init : ( Model, Cmd Msg )
init =
    ( { signUp = signUpModel }, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update message state =
    case message of
        SignUp signUpMessage ->
            let (signUpState , cmd ) = signUpUpdate signUpMessage state.signUp
            in
            ( { state | signUp = signUpState }, Cmd.map SignUp cmd )


num : String -> Html Msg
num n =
    span [ class [ BrzeCss.Num ] ] [ text n ]

oneTwoThree : Html Msg
oneTwoThree =
    p [ class [ BrzeCss.Easy ] ]
        [ p [ class [ BrzeCss.VerticalBrze ] ] [ text "Brze" ]
        , p [ class [ BrzeCss.Steps ] ]
            [ span [] [ text "It’s as simple as ", b [ style [ ( "font-weight", "500" ) ] ] [ text "1, 2, 3" ], text "!" ]
            , div [ class [ BrzeCss.NumWrapper ] ]
                [ num "1 "
                , span [] [ span [ style [ ( "font-weight", "500" ) ] ] [ text "TEXT US " ], text "at ", b [ style [ ( "font-weight", "500" ) ] ] [ text "848.702.3698" ] ]
                ]
            , div [ class [ BrzeCss.NumWrapper ] ]
                [ num "2 "
                , span [] [ text "We come and pickup your packages*" ]
                ]
            , div [ class [ BrzeCss.NumWrapper ] ]
                [ num "3 "
                , span [] [ text "We text you a confirmation that inclides an image and tracking number after delivery" ]
                ]
            , p [ class [ BrzeCss.Currently ] ] [ text "*Currently in Summit, NJ Only" ]
            ]
        ]


view : Model -> Html Msg
view model =
    div []
        [ img
            [ class [ BrzeCss.BrzeLogo ]
            , src "/images/brze.png"
            ]
            []
        , h1 []
            [ span [ class [ BrzeCss.MakingPickupEasy ] ] [ text "Making pickup easy! " ]
            , span [ class [ BrzeCss.Carriers ] ] [ text "FedEx • USPS • UPS" ]
            ]
        , p [ class [ BrzeCss.Intro ] ]
            [ p [ class [ BrzeCss.Title ] ]
                [ span [ class [ BrzeCss.Introducing ] ] [ text "Introducing Brze. " ]
                , span [] [ text "Returns Made Easy!" ]
                ]
            , p [ class [ BrzeCss.Finally ] ]
                [ text "Finally, an affordable service that will pick up your package/s from your home and drop them off at "
                , span [ class [ BrzeCss.Carriers ] ] [ text "FedEx, USPS, or UPS." ]
                ]
            ]
        , oneTwoThree
        , Html.map SignUp (signUpView model.signUp)
        ]
