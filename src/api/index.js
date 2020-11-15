import client from "./client";
import {gql} from "@apollo/client";

export default {
    login: function () {
        return client.query({
            query: gql`
                query {
                    viewer{
                        login
                    }
                }
            `
        })
    }
}