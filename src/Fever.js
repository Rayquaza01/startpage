// https://feedafever.com/api

export default class Fever {
    constructor(endpoint, apikey) {
        this.endpoint = endpoint;
        this.apikey = apikey;
    }

    async request(args = "") {
        let response = await fetch(this.endpoint + "?api&" + args, {
            body: "api_key=" + this.apikey,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post"
        });
        return response.json();
    }

    async auth() {
        return await this.request();
    }

    async groups() {
        let groups = await this.request("groups");
        groups.feeds_groups = groups.feeds_groups.map(item => {
            item.feed_ids = item.feed_ids.split(",").map(Number);
            return item;
        });
        return groups;
    }

    async feeds() {
        return await this.request("feeds");
    }

    async favicons() {
        return await this.request("favicons");
    }

    async items(since_id = null, max_id = null, with_ids = null) {
        let params = "";
        if (typeof since_id === "number") {
            params += "since_id=" + since_id + "&";
        }
        if (typeof max_id === "number") {
            params += "max_id=" + max_id + "&";
        }
        if (typeof with_ids === "string") {
            params += "with_ids=" + with_ids + "&";
        }
        return await this.request("items&" + params);
    }

    async unread() {
        return await this.request("unread_item_ids");
    }

    async saved() {
        return await this.request("saved_item_ids");
    }

    async markAsRead(type, as, id) {
        return await this.request(
            "mark=" + type +
            "&as=" + as +
            "&id=" + id
        );
    }
}
