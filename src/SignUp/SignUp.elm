module SignUp.SignUp exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.CssHelpers exposing (withNamespace)
import Html.Events exposing (..)
import Http
import Json.Decode exposing (Decoder, at, string)
import Json.Encode exposing (Value, encode, object)
import SignUp.SignUpCss


{ id, class, classList } =
    withNamespace "signUp"


type alias SignUpModel =
    { name : String
    , phoneNumber : String
    , address1 : String
    , address2 : String
    , city : String
    , zip : String
    , email : String
    , password1 : String
    , password2 : String
    , signedUp : Bool
    , submitDisabled : Bool
    , signedUpErr : String
    }


signUpModel : SignUpModel
signUpModel =
    SignUpModel "" "" "" "" "" "" "" "" "" False False ""


toJson : SignUpModel -> Value
toJson m =
    Json.Encode.object
        [ ( "name", Json.Encode.string m.name )
        , ( "phoneNumber", Json.Encode.string m.phoneNumber )
        , ( "address1", Json.Encode.string m.address1 )
        , ( "address2", Json.Encode.string m.address2 )
        , ( "city", Json.Encode.string m.city )
        , ( "zip", Json.Encode.string m.zip )
        , ( "email", Json.Encode.string m.email )
        , ( "password1", Json.Encode.string m.password1 )
        , ( "password2", Json.Encode.string m.password2 )
        ]


type SignUpMsg
    = Name String
    | PhoneNumber String
    | Email String
    | Address1 String
    | Zip String
    | Address2 String
    | City String
    | Password1 String
    | Password2 String
    | SignUpRequest (Result Http.Error String)
    | SubmitSignUp


signUpUpdate : SignUpMsg -> SignUpModel -> ( SignUpModel, Cmd SignUpMsg )
signUpUpdate msg signUpModel =
    case msg of
        Name name ->
            ( { signUpModel | name = name }, Cmd.none )

        PhoneNumber pn ->
            ( { signUpModel | phoneNumber = pn }, Cmd.none )

        Email e ->
            ( { signUpModel | email = e }, Cmd.none )

        Address1 a1 ->
            ( { signUpModel | address1 = a1 }, Cmd.none )

        Address2 a2 ->
            ( { signUpModel | address1 = a2 }, Cmd.none )

        Password1 a1 ->
            ( { signUpModel | address1 = a1 }, Cmd.none )

        Password2 a2 ->
            ( { signUpModel | address1 = a2 }, Cmd.none )

        Zip z ->
            ( { signUpModel | zip = z }, Cmd.none )

        City c ->
            ( { signUpModel | city = c }, Cmd.none )

        SubmitSignUp ->
            ( signUpModel, signUpRequest signUpModel )

        SignUpRequest (Ok newUrl) ->
            ( { signUpModel | signedUp = True }, Cmd.none )

        SignUpRequest (Err _) ->
            ( { signUpModel | signedUpErr = "test" }, Cmd.none )


signUpRequest : SignUpModel -> Cmd SignUpMsg
signUpRequest sumodel =
    let
        url =
            "/api/signup"

        test =
            Http.stringBody "application/json" (encode 0 (toJson sumodel))

        request =
            Http.post url test decodeGifUrl
    in
    Http.send SignUpRequest request


decodeGifUrl : Decoder String
decodeGifUrl =
    at [ "data", "image_url" ] string


signUpInput : Html SignUpMsg -> Html SignUpMsg
signUpInput input =
    div [ class [ SignUp.SignUpCss.InputWrapper ] ]
        [ input ]


signUpForm : SignUpModel -> Html SignUpMsg
signUpForm signUpModel =
    List.map signUpInput
        [ div []
            [ div [] [ text "Name*" ]
            , input [ type_ "text", onInput Name, class [ SignUp.SignUpCss.Input ] ] []
            ]
        , div []
            [ div [] [ text "Street Address*" ]
            , input [ type_ "text", onInput Address1, class [ SignUp.SignUpCss.Input ] ] []
            ]
        , div []
            [ div [] [ text "Apt., Floor, Unit etc. (Optional)" ]
            , input [ type_ "text", onInput Address2, class [ SignUp.SignUpCss.Input ] ] []
            ]
        , div []
            [ div [] [ text "Zip Code*" ]
            , input [ type_ "text", onInput Zip, class [ SignUp.SignUpCss.Input ] ] []
            ]
        , div []
            [ div [] [ text "City*" ]
            , input [ type_ "text", onInput City, class [ SignUp.SignUpCss.Input ] ] []
            ]
        , div []
            [ div [] [ text "Password*" ]
            , input [ type_ "text", onInput Password1, class [ SignUp.SignUpCss.Input ] ] []
            ]
        , div []
            [ div [] [ text "Password Again*" ]
            , input [ type_ "text", onInput Password2, class [ SignUp.SignUpCss.Input ] ] []
            ]
        , div []
            [ div [] [ text "Email*" ]
            , input [ type_ "email", onInput Email, class [ SignUp.SignUpCss.Input ] ] []
            ]
        , div []
            [ div [] [ text "Phone Number*" ]
            , input [ type_ "tel", onInput PhoneNumber, class [ SignUp.SignUpCss.Input ] ] []
            ]
        ]
        ++ [ button [ onClick SubmitSignUp, class [ SignUp.SignUpCss.SignUpButton ], disabled signUpModel.submitDisabled ] [ text "Submit" ]
           , viewValidation signUpModel
           ]
        |> div []


signUpView : SignUpModel -> Html SignUpMsg
signUpView signUpModel =
    div [ class [ SignUp.SignUpCss.SignUp ] ]
        [ div [ class [ SignUp.SignUpCss.SignUpTitle ] ] [ text "Sign Up For Brze!" ]
        , div [] [ text "Required*" ]
        , signUpForm signUpModel
        ]


viewValidation : SignUpModel -> Html msg
viewValidation model =
    let
        ( color, message ) =
            if model.password1 == model.password2 then
                ( "green", "" )
            else
                ( "red", "Passwords do not match!" )
    in
    div [ style [ ( "color", color ) ] ] [ text message ]
