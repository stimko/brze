port module Stylesheets exposing (..)

import Css.File exposing (..)
import BrzeCss


port files : CssFileStructure -> Cmd msg


fileStructure : CssFileStructure
fileStructure =
    Css.File.toFileStructure
        [ ( "client.css", Css.File.compile [ BrzeCss.css ] ) ]


main : CssCompilerProgram
main =
    Css.File.compiler files fileStructure