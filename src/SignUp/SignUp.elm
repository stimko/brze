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
    , email : String
    , password1 : String
    , password2 : String
    , signedUp : Bool
    , signedUpErr : String
    }


signUpModel : SignUpModel
signUpModel =
    SignUpModel "" "" "" "" "" "" "" False ""


toJson : SignUpModel -> Value
toJson m =
    Json.Encode.object
        [ ( "name", Json.Encode.string m.name )
        , ( "phoneNumber", Json.Encode.string m.phoneNumber )
        , ( "address1", Json.Encode.string m.address1 )
        , ( "address2", Json.Encode.string m.address2 )
        , ( "email", Json.Encode.string m.email )
        , ( "password1", Json.Encode.string m.password1 )
        , ( "password2", Json.Encode.string m.password2 )
        ]


type SignUpMsg
    = Name String
    | PhoneNumber String
    | Email String
    | Address1 String
    | Address2 String
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

        SubmitSignUp ->
            ( signUpModel, signUpRequest signUpModel )

        SignUpRequest (Ok newUrl) ->
            Debug.log "who"
                ( { signUpModel | signedUp = True }, Cmd.none )

        SignUpRequest (Err _) ->
            Debug.log "what"
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


signUpView : SignUpModel -> Html SignUpMsg
signUpView signUpModel =
    List.map signUpInput
        [ input [ type_ "text", placeholder "Name", onInput Name ] []
        , input [ type_ "text", placeholder "Address1", onInput Address1 ] []
        , input [ type_ "text", placeholder "Address2", onInput Address2 ] []
        , input [ type_ "text", placeholder "Password1", onInput Password1 ] []
        , input [ type_ "text", placeholder "Password2", onInput Password2 ] []
        , input [ type_ "email", placeholder "Email", onInput Email ] []
        , input [ type_ "tel", placeholder "Phone Number", onInput PhoneNumber ] []
        ]
        ++ [ button [ onClick SubmitSignUp ] [ text "Submit" ]
           , viewValidation signUpModel
           ]
        |> div []


viewValidation : SignUpModel -> Html msg
viewValidation model =
    let
        ( color, message ) =
            if model.password1 == model.password2 then
                ( "green", "OK" )
            else
                ( "red", "Passwords do not match!" )
    in
    div [ style [ ( "color", color ) ] ] [ text message ]
