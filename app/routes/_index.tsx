import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SanityDocument } from "@sanity/client";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import imageUrlBuilder from "@sanity/image-url";

import { EVENT_QUERY } from "~/sanity/queries";
import { projectId, dataset } from "~/sanity/projectDetails";
const builder = imageUrlBuilder({ projectId, dataset });

// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

export const loader = async () => {
  const initial = await loadQuery<SanityDocument[]>(EVENT_QUERY);

  return { initial, query: EVENT_QUERY, params: {} };
};

export default function Index() {
  const {initial,query,params} = useLoaderData<typeof loader>();

  const {data,loading} = useQuery<typeof initial.data>(query,params,{
    //@ts-ignore
    initial
  });
  console.log(data);
  
  return (
    <div className="font-sans p-4 flex justify-center items-center flex-col">
      <h1 className="text-3xl">Sanity Headless CMS</h1>
      {loading && !data ? (
        "loading..."
      ) : data ? (
        <>
          {data.map((event) => (
            <div
              key={event._id}
              className="p-4 border border-gray-200 rounded-lg my-4"
            >
              <h2 className="text-xl">{event.name}</h2>
              <p className="text-gray-600">{event.headline.name}</p>
              {event.image && (
                <img
                  src={builder
                    .image(event.image)
                    .width(100)
                    .height(100)
                    .quality(80)
                    .url() as string}
                  alt={event.name}
                  className="w-96 h-80 object-cover rounded-lg my-4"
                />
              )}
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}
