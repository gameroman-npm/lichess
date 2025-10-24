import * as z from "zod";

import Flair from "./Flair";
import PatronColor from "./PatronColor";
import TimelineEntryBlogPost from "./TimelineEntryBlogPost";
import TimelineEntryFollow from "./TimelineEntryFollow";
import TimelineEntryForumPost from "./TimelineEntryForumPost";
import TimelineEntryGameEnd from "./TimelineEntryGameEnd";
import TimelineEntryPlanRenew from "./TimelineEntryPlanRenew";
import TimelineEntryPlanStart from "./TimelineEntryPlanStart";
import TimelineEntrySimul from "./TimelineEntrySimul";
import TimelineEntryStreamStart from "./TimelineEntryStreamStart";
import TimelineEntryStudyLike from "./TimelineEntryStudyLike";
import TimelineEntryTeamCreate from "./TimelineEntryTeamCreate";
import TimelineEntryTeamJoin from "./TimelineEntryTeamJoin";
import TimelineEntryTourJoin from "./TimelineEntryTourJoin";
import TimelineEntryUblogPost from "./TimelineEntryUblogPost";
import TimelineEntryUblogPostLike from "./TimelineEntryUblogPostLike";
import Title from "./Title";

const Timeline = z.object({
  entries: z.array(
    z.discriminatedUnion("type", [
      TimelineEntryFollow,
      TimelineEntryTeamJoin,
      TimelineEntryTeamCreate,
      TimelineEntryForumPost,
      TimelineEntryBlogPost,
      TimelineEntryUblogPost,
      TimelineEntryTourJoin,
      TimelineEntryGameEnd,
      TimelineEntrySimul,
      TimelineEntrySimul,
      TimelineEntryStudyLike,
      TimelineEntryPlanStart,
      TimelineEntryPlanRenew,
      TimelineEntryUblogPostLike,
      TimelineEntryStreamStart,
    ])
  ),
  users: z.record(
    z.string(),
    z.object({
      id: z.string(),
      name: z.string(),
      title: Title.optional(),
      flair: Flair.optional(),
      patron: z.boolean().optional(),
      patronColor: PatronColor.optional(),
    })
  ),
});

type Timeline = z.infer<typeof Timeline>;

export { Timeline };
export default Timeline;
