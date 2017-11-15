port module Stylesheets exposing (..)

import Css.File exposing (..)
import SignUp.SignUpCss
import BrzeCss


port files : CssFileStructure -> Cmd msg


fileStructure : CssFileStructure
fileStructure =
    Css.File.toFileStructure
        [ ( "client.css", Css.File.compile [ BrzeCss.css, SignUp.SignUpCss.css ] ) ]


main : CssCompilerProgram
main =
    Css.File.compiler files fileStructure