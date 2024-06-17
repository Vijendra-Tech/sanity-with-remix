import groq from "groq";

export const EVENT_QUERY = groq`*[_type=="event" && eventType =="in-person"]{
  ...,
  headline -> {
    name
  },
  "upcoming":true
}`;
// export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
