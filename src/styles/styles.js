// Some styles to use in the app
import { makeStyles } from "@material-ui/core";

const useFormStyle = makeStyles(() => ({
    form: {
        padding: "2%",
        height: "150%",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-around",
        alignItems: "center"
    }
}));

export { useFormStyle };
