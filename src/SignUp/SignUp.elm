module SignUp.SignUp exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


type alias SignUpModel =
    { name : String
    , phoneNumber : String
    , address1 : String
    , address2 : String
    , email : String
    , creditCard : String
    }


signUpModel : SignUpModel
signUpModel =
    SignUpModel "" "" "" "" "" ""

type SignUpMsg
    = Name String
    | PhoneNumber String
    | Email String
    | Address1 String
    | Address2 String
    | CreditCard String


signUpUpdate : SignUpMsg -> SignUpModel -> SignUpModel
signUpUpdate msg signUpModel =
    case msg of
        Name name ->
            { signUpModel | name = name }

        PhoneNumber pn ->
            { signUpModel | phoneNumber = pn }

        CreditCard cc ->
            { signUpModel | creditCard = cc }

        Email e ->
            { signUpModel | email = e }

        Address1 a1 ->
            { signUpModel | address1 = a1 }

        Address2 a2 ->
            { signUpModel | address1 = a2 }


signUpView : SignUpModel -> Html SignUpMsg
signUpView signUpModel =
    div []
        [ input [ type_ "text", placeholder "Name", onInput Name ] []
        , input [ type_ "text", placeholder "Address1", onInput Address1 ] []
        , input [ type_ "text", placeholder "Address2", onInput Address2 ] []
        , input [ type_ "email", placeholder "Email", onInput Email ] []
        , input [ type_ "tel", placeholder "Phone Number", onInput PhoneNumber ] []
        , input [ type_ "text", placeholder "Credit Card", onInput CreditCard ] []

        --, viewValidation model
        ]



-- viewValidation : Model -> Html msg
-- viewValidation model =
--   let
--     (color, message) =
--       if model.password == model.passwordAgain then
--         ("green", "OK")
--       else
--         ("red", "Passwords do not match!")
--   in
--     div [ style [("color", color)] ] [ text message ]
