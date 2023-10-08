"use client";
import { useEffect } from "react";
import localStore from "@/utils/localStore";
interface GetRedditAccessTokenResp {
  access_token: string;
  token_type: "bearer";
  scope: string;
  expires_in: number;
}
export default function Home() {
  useEffect(() => {
    async function getData() {
      const storedAccessToken: GetRedditAccessTokenResp =
        localStore.getUnExpiredItem("reddit-token") ||
        (new Object() as GetRedditAccessTokenResp);
      let access_token = storedAccessToken.access_token;
      if (!access_token) {
        const resp = await fetch(
          "https://untitled-v7rl226r83dv.runkit.sh/get-reddit-access-token",
        );
        const jsonResp: GetRedditAccessTokenResp = await resp.json();
        localStore.setItemWithExpiry(
          "reddit-token",
          jsonResp,
          jsonResp.expires_in,
        );
        access_token = jsonResp.access_token;
      }
      return access_token;
    }
    getData().then(async (access_token) => {
      let savedList = ["/r/javascript"];
      const resp = await fetch(`https://oauth.reddit.com${savedList[0]}/hot`, {
        headers: new Headers({
          Authorization: "Bearer " + access_token,
        }),
      });
      // let postTitle = post.data.title,
      //     postUrl = post.data.url,
      //     postPermalink = post.data.permalink,
      //     postAuthor = post.data.author,
      //     score = post.data.score,
      //     postNsfw = post.data.over_18,
      //     nsfwLabel = '';
      const respValue = await resp.json();
      console.log(respValue.data.children);
    });
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
