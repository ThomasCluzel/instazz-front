// Some styles to use in the app
import { makeStyles } from "@material-ui/core";

const useAppStyle = makeStyles(() => ({
    form: {
        padding: "2%",
        height: "150%",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-around",
        alignItems: "center"
    },
    page: {
        // let 10% of white space on the sides
        width: "80%",
        marginLeft: "10%",
        // by default elements should be centered on the page
        textAlign: "center"
    }
}));

export default useAppStyle;
