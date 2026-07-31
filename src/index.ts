import * as z from "minizod";
import { Requestor } from "./lib/requestor";
import * as schemas from "./schemas";

const BASE_URL = "https://lichess.org";

export class Lichess {
  private readonly requestor: Requestor;

  constructor(options: { token: string | null }) {
    const { token } = options;
    this.requestor = new Requestor({ token, baseUrl: BASE_URL });
  }

  /**
   * Get real-time users status
   */
  async apiUsersStatus(params: {
    ids: string;
    withSignal?: boolean;
    withGameIds?: boolean;
    withGameMetas?: boolean;
  }) {
    const path = "/api/users/status";
    return await this.requestor.get(
      { path, query: params },
      {
        200: {
          kind: "json",
          schema: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              flair: z.optional(schemas.Flair),
              title: z.optional(schemas.Title),
              online: z.optional(z.boolean()),
              playing: z.optional(z.boolean()),
              streaming: z.optional(z.boolean()),
              patron: z.optional(schemas.Patron),
              patronColor: z.optional(schemas.PatronColor),
            }),
          ),
        },
      },
    );
  }

  /**
   * Get all top 10
   */
  async player() {
    const path = "/api/player";
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.Top10s } },
    );
  }

  /**
   * Get one leaderboard
   */
  async playerTopNbPerfType(params: {
    nb: number;
    perfType:
      | "ultraBullet"
      | "bullet"
      | "blitz"
      | "rapid"
      | "classical"
      | "chess960"
      | "crazyhouse"
      | "antichess"
      | "atomic"
      | "horde"
      | "kingOfTheHill"
      | "racingKings"
      | "threeCheck";
  }) {
    const path = `/api/player/top/${params.nb}/${params.perfType}`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.Leaderboard } },
    );
  }

  /**
   * Get user public data
   */
  async apiUser(
    params: { username: string } & {
      trophies?: boolean;
      profile?: boolean;
      rank?: boolean;
      fideId?: boolean;
    },
  ) {
    const path = `/api/user/${params.username}`;
    return await this.requestor.get(
      {
        path,
        query: {
          trophies: params.trophies,
          profile: params.profile,
          rank: params.rank,
          fideId: params.fideId,
        },
      },
      { 200: { kind: "json", schema: schemas.UserExtended } },
    );
  }

  /**
   * Get rating history of a user
   */
  async apiUserRatingHistory(params: { username: string }) {
    const path = `/api/user/${params.username}/rating-history`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.RatingHistory } },
    );
  }

  /**
   * Get performance statistics of a user
   */
  async apiUserPerf(params: { username: string; perf: schemas.PerfType }) {
    const path = `/api/user/${params.username}/perf/${params.perf}`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.PerfStat } },
    );
  }

  /**
   * Get user activity
   */
  async apiUserActivity(params: { username: string }) {
    const path = `/api/user/${params.username}/activity`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: z.array(schemas.UserActivity) } },
    );
  }

  /**
   * Get the daily puzzle
   */
  async apiPuzzleDaily() {
    const path = "/api/puzzle/daily";
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.PuzzleAndGame } },
    );
  }

  /**
   * Get a puzzle by its ID
   */
  async apiPuzzleId(params: { id: string }) {
    const path = `/api/puzzle/${params.id}`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.PuzzleAndGame } },
    );
  }

  /**
   * Get a new puzzle
   */
  async apiPuzzleNext(params: {
    angle?: string;
    difficulty?: "easiest" | "easier" | "normal" | "harder" | "hardest";
    color?: "white" | "black";
  }) {
    const path = "/api/puzzle/next";
    return await this.requestor.get(
      { path, query: params },
      { 200: { kind: "json", schema: schemas.PuzzleAndGame } },
    );
  }

  /**
   * Get multiple puzzles at once
   */
  async apiPuzzleBatchSelect(
    params: { angle: string } & {
      difficulty?: "easiest" | "easier" | "normal" | "harder" | "hardest";
      nb?: number;
      color?: "white" | "black";
    },
  ) {
    const path = `/api/puzzle/batch/${params.angle}`;
    return await this.requestor.get(
      {
        path,
        query: {
          difficulty: params.difficulty,
          nb: params.nb,
          color: params.color,
        },
      },
      { 200: { kind: "json", schema: schemas.PuzzleBatchSelect } },
    );
  }

  /**
   * Solve multiple puzzles at once
   */
  async apiPuzzleBatchSolve(
    params: { angle: string } & { nb?: number } & {
      body: schemas.PuzzleBatchSolveRequest;
    },
  ) {
    const path = `/api/puzzle/batch/${params.angle}`;
    return await this.requestor.post(
      { path, query: { nb: params.nb }, body: params.body },
      { 200: { kind: "json", schema: schemas.PuzzleBatchSolveResponse } },
    );
  }

  /**
   * Get your puzzle activity
   */
  async apiPuzzleActivity(params: {
    max?: number;
    before?: number;
    since?: number;
  }) {
    const path = "/api/puzzle/activity";
    return await this.requestor.get(
      { path, query: params },
      { 200: { kind: "ndjson", schema: schemas.PuzzleActivity } },
    );
  }

  /**
   * Get puzzles to replay
   */
  async apiPuzzleReplay(params: { days: number; theme: string }) {
    const path = `/api/puzzle/replay/${params.days}/${params.theme}`;
    return await this.requestor.get(
      { path },
      {
        200: { kind: "json", schema: schemas.PuzzleReplay },
        404: {
          kind: "json",
          schema: z.object({ error: z.optional(z.string()) }),
        },
      },
    );
  }

  /**
   * Get your puzzle dashboard
   */
  async apiPuzzleDashboard(params: { days: number }) {
    const path = `/api/puzzle/dashboard/${params.days}`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.PuzzleDashboard } },
    );
  }

  /**
   * Get the storm dashboard of a player
   */
  async apiStormDashboard(params: { username: string } & { days?: number }) {
    const path = `/api/storm/dashboard/${params.username}`;
    return await this.requestor.get(
      { path, query: { days: params.days } },
      { 200: { kind: "json", schema: schemas.PuzzleStormDashboard } },
    );
  }

  /**
   * Create and join a puzzle race
   */
  async racerPost() {
    const path = "/api/racer";
    return await this.requestor.post(
      { path },
      { 200: { kind: "json", schema: schemas.PuzzleRacer } },
    );
  }

  /**
   * Get puzzle race results
   */
  async racerGet(params: { id: string }) {
    const path = `/api/racer/${params.id}`;
    return await this.requestor.get(
      { path },
      {
        200: { kind: "json", schema: schemas.PuzzleRaceResults },
        404: { kind: "json", schema: schemas.NotFound },
      },
    );
  }

  /**
   * Get users by ID
   */
  async apiUsers(
    params: {
      profile?: boolean;
      rank?: boolean;
    } & { body: string },
  ) {
    const path = "/api/users";
    return await this.requestor.post(
      {
        path,
        query: { profile: params.profile, rank: params.rank },
        body: params.body,
      },
      { 200: { kind: "json", schema: z.array(schemas.User) } },
    );
  }

  /**
   * Get my profile
   */
  async accountMe() {
    const path = "/api/account";
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.UserExtended } },
    );
  }

  /**
   * Get my email address
   */
  async accountEmail() {
    const path = "/api/account/email";
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "json",
          schema: z.object({ email: z.optional(z.string()) }),
        },
      },
    );
  }

  /**
   * Get my preferences
   */
  async account() {
    const path = "/api/account/preferences";
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "json",
          schema: z.object({
            prefs: z.optional(schemas.UserPreferences),
            language: z.optional(z.string()),
          }),
        },
      },
    );
  }

  /**
   * Get my kid mode status
   */
  async accountKid() {
    const path = "/api/account/kid";
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "json",
          schema: z.object({ kid: z.optional(z.boolean()) }),
        },
      },
    );
  }

  /**
   * Set my kid mode status
   */
  async accountKidPost(params: { v: boolean }) {
    const path = "/api/account/kid";
    return await this.requestor.post(
      { path, query: params },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Get my timeline
   */
  async timeline(params: { since?: number; nb?: number }) {
    const path = "/api/timeline";
    return await this.requestor.get(
      { path, query: params },
      { 200: { kind: "json", schema: schemas.Timeline } },
    );
  }

  /**
   * Export one game
   */
  async gamePgn(
    params: { gameId: string } & {
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
      literate?: boolean;
      withBookmarked?: boolean;
    },
  ) {
    const path = `/game/export/${params.gameId}`;
    return await this.requestor.get(
      {
        path,
        query: {
          moves: params.moves,
          pgnInJson: params.pgnInJson,
          tags: params.tags,
          clocks: params.clocks,
          evals: params.evals,
          accuracy: params.accuracy,
          opening: params.opening,
          division: params.division,
          literate: params.literate,
          withBookmarked: params.withBookmarked,
        },
      },
      {
        200: {
          kind: "json",
          schema: z.union([schemas.GamePgn, schemas.GameJson]),
        },
      },
    );
  }

  /**
   * Fetch the spectator game chat
   */
  async gameChatGet(params: { gameId: string }) {
    const path = `/api/game/${params.gameId}/chat`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "ndjson", schema: schemas.SpectatorGameChat } },
    );
  }

  /**
   * Export ongoing game of a user
   */
  async apiUserCurrentGame(
    params: { username: string } & {
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
      literate?: boolean;
    },
  ) {
    const path = `/api/user/${params.username}/current-game`;
    return await this.requestor.get(
      {
        path,
        query: {
          moves: params.moves,
          pgnInJson: params.pgnInJson,
          tags: params.tags,
          clocks: params.clocks,
          evals: params.evals,
          accuracy: params.accuracy,
          opening: params.opening,
          division: params.division,
          literate: params.literate,
        },
      },
      {
        200: {
          kind: "json",
          schema: z.union([schemas.GamePgn, schemas.GameJson]),
        },
      },
    );
  }

  /**
   * Export games of a user
   */
  async apiGamesUser(
    params: { username: string } & {
      since?: number;
      until?: number;
      max?: number;
      vs?: string;
      rated?: boolean;
      perfType?: schemas.PerfType;
      color?: "white" | "black";
      analysed?: boolean;
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
      ongoing?: boolean;
      finished?: boolean;
      literate?: boolean;
      lastFen?: boolean;
      withBookmarked?: boolean;
      sort?: "dateAsc" | "dateDesc";
    },
  ) {
    const path = `/api/games/user/${params.username}`;
    return await this.requestor.get(
      {
        path,
        query: {
          since: params.since,
          until: params.until,
          max: params.max,
          vs: params.vs,
          rated: params.rated,
          perfType: params.perfType,
          color: params.color,
          analysed: params.analysed,
          moves: params.moves,
          pgnInJson: params.pgnInJson,
          tags: params.tags,
          clocks: params.clocks,
          evals: params.evals,
          accuracy: params.accuracy,
          opening: params.opening,
          division: params.division,
          ongoing: params.ongoing,
          finished: params.finished,
          literate: params.literate,
          lastFen: params.lastFen,
          withBookmarked: params.withBookmarked,
          sort: params.sort,
        },
      },
      {
        200: {
          kind: "ndjson",
          schema: z.union([schemas.GamePgn, schemas.GameJson]),
        },
      },
    );
  }

  /**
   * Export games by IDs
   */
  async gamesExportIds(
    params: {
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
      literate?: boolean;
    } & { body: string },
  ) {
    const path = "/api/games/export/_ids";
    return await this.requestor.post(
      {
        path,
        query: {
          moves: params.moves,
          pgnInJson: params.pgnInJson,
          tags: params.tags,
          clocks: params.clocks,
          evals: params.evals,
          accuracy: params.accuracy,
          opening: params.opening,
          division: params.division,
          literate: params.literate,
        },
        body: params.body,
      },
      {
        200: {
          kind: "json",
          schema: z.union([schemas.GamePgn, schemas.GameJson]),
        },
      },
    );
  }

  /**
   * Stream games of users
   */
  async gamesByUsers(
    params: { withCurrentGames?: boolean } & { body: string },
  ) {
    const path = "/api/stream/games-by-users";
    return await this.requestor.post(
      {
        path,
        query: { withCurrentGames: params.withCurrentGames },
        body: params.body,
      },
      { 200: { kind: "ndjson", schema: schemas.GameStream } },
    );
  }

  /**
   * Stream games by IDs
   */
  async gamesByIds(params: { streamId: string } & { body: string }) {
    const path = `/api/stream/games/${params.streamId}`;
    return await this.requestor.post(
      { path, body: params.body },
      { 200: { kind: "ndjson", schema: schemas.GameStream } },
    );
  }

  /**
   * Add game IDs to stream
   */
  async gamesByIdsAdd(params: { streamId: string } & { body: string }) {
    const path = `/api/stream/games/${params.streamId}/add`;
    return await this.requestor.post(
      { path, body: params.body },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Get my ongoing games
   */
  async apiAccountPlaying(params: { nb?: number }) {
    const path = "/api/account/playing";
    return await this.requestor.get(
      { path, query: params },
      {
        200: {
          kind: "json",
          schema: z.object({
            nbMyTurn: z.int(),
            nowPlaying: z.array(
              z.object({
                fullId: z.string(),
                gameId: z.string(),
                fen: z.string(),
                color: schemas.GameColor,
                lastMove: z.string(),
                source: schemas.GameSource,
                status: z.optional(schemas.GameStatusName),
                variant: schemas.Variant,
                speed: schemas.Speed,
                perf: schemas.PerfType,
                rated: z.boolean(),
                hasMoved: z.boolean(),
                opponent: z.object({
                  id: z.string(),
                  username: z.string(),
                  rating: z.optional(z.int()),
                  ratingDiff: z.optional(z.int()),
                  ai: z.optional(z.int()),
                }),
                isMyTurn: z.boolean(),
                secondsLeft: z.int(),
                tournamentId: z.optional(z.string()),
                swissId: z.optional(z.string()),
                winner: z.optional(schemas.GameColor),
                ratingDiff: z.optional(z.int()),
              }),
            ),
          }),
        },
      },
    );
  }

  /**
   * Stream moves of a game
   */
  async streamGame(params: { id: string }) {
    const path = `/api/stream/game/${params.id}`;
    return await this.requestor.get(
      { path },
      {
        200: { kind: "ndjson", schema: schemas.MoveStream },
        429: {
          kind: "json",
          schema: z.object({ error: z.optional(z.string()) }),
        },
      },
    );
  }

  /**
   * Import one game
   */
  async gameImport(params: { body: { pgn?: string } }) {
    const path = "/api/import";
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: {
          kind: "json",
          schema: z.object({
            id: z.optional(z.string()),
            url: z.optional(z.url()),
          }),
        },
      },
    );
  }

  /**
   * Export your imported games
   */
  async apiImportedGamesUser() {
    const path = "/api/games/export/imports";
    return await this.requestor.get({ path }, { 200: { kind: "chess-pgn" } });
  }

  /**
   * Export your bookmarked games
   */
  async apiExportBookmarks(params: {
    since?: number;
    until?: number;
    max?: number;
    moves?: boolean;
    pgnInJson?: boolean;
    tags?: boolean;
    clocks?: boolean;
    evals?: boolean;
    accuracy?: boolean;
    opening?: boolean;
    division?: boolean;
    literate?: boolean;
    lastFen?: boolean;
    sort?: "dateAsc" | "dateDesc";
  }) {
    const path = "/api/games/export/bookmarks";
    return await this.requestor.get(
      { path, query: params },
      {
        200: {
          kind: "json",
          schema: z.union([schemas.GamePgn, schemas.GameJson]),
        },
      },
    );
  }

  /**
   * Bookmark a game
   */
  async bookmarkToggle(params: { gameId: string } & { v?: boolean }) {
    const path = `/bookmark/${params.gameId}`;
    return await this.requestor.post(
      { path, query: { v: params.v } },
      { 204: { kind: "nocontent" } },
    );
  }

  /**
   * Get current TV games
   */
  async tvChannels() {
    const path = "/api/tv/channels";
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "json",
          schema: z.object({
            bot: schemas.TvGame,
            blitz: schemas.TvGame,
            racingKings: schemas.TvGame,
            ultraBullet: schemas.TvGame,
            bullet: schemas.TvGame,
            classical: schemas.TvGame,
            threeCheck: schemas.TvGame,
            antichess: schemas.TvGame,
            computer: schemas.TvGame,
            horde: schemas.TvGame,
            rapid: schemas.TvGame,
            atomic: schemas.TvGame,
            crazyhouse: schemas.TvGame,
            chess960: schemas.TvGame,
            kingOfTheHill: schemas.TvGame,
            best: schemas.TvGame,
          }),
        },
      },
    );
  }

  /**
   * Stream current TV game
   */
  async tvFeed() {
    const path = "/api/tv/feed";
    return await this.requestor.get(
      { path },
      { 200: { kind: "ndjson", schema: schemas.TvFeed } },
    );
  }

  /**
   * Stream current TV game of a TV channel
   */
  async tvChannelFeed(params: { channel: string }) {
    const path = `/api/tv/${params.channel}/feed`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "ndjson", schema: schemas.TvFeed } },
    );
  }

  /**
   * Get best ongoing games of a TV channel
   */
  async tvChannelGames(
    params: { channel: string } & {
      nb?: number;
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      opening?: boolean;
    },
  ) {
    const path = `/api/tv/${params.channel}`;
    return await this.requestor.get(
      {
        path,
        query: {
          nb: params.nb,
          moves: params.moves,
          pgnInJson: params.pgnInJson,
          tags: params.tags,
          clocks: params.clocks,
          opening: params.opening,
        },
      },
      { 200: { kind: "mixed" } },
    );
  }

  /**
   * Get current tournaments
   */
  async apiTournament() {
    const path = "/api/tournament";
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.ArenaTournaments } },
    );
  }

  /**
   * Create a new Arena tournament
   */
  async apiTournamentPost(params: {
    body: {
      name?: string;
      clockTime:
        | 0
        | 0.25
        | 0.5
        | 0.75
        | 1
        | 1.5
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 10
        | 15
        | 20
        | 25
        | 30
        | 40
        | 50
        | 60;
      clockIncrement:
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 10
        | 15
        | 20
        | 25
        | 30
        | 40
        | 50
        | 60;
      minutes:
        | 20
        | 25
        | 30
        | 35
        | 40
        | 45
        | 50
        | 55
        | 60
        | 70
        | 80
        | 90
        | 100
        | 110
        | 120
        | 150
        | 180
        | 210
        | 240
        | 270
        | 300
        | 330
        | 360
        | 420
        | 480
        | 540
        | 600
        | 720;
      waitMinutes?: 1 | 2 | 3 | 5 | 10 | 15 | 20 | 30 | 45 | 60;
      startDate?: number;
      variant?: schemas.VariantKey;
      rated?: boolean;
      position?: schemas.FromPositionFEN;
      berserkable?: boolean;
      streakable?: boolean;
      hasChat?: boolean;
      description?: string;
      password?: string;
      teamBattleByTeam?: string;
      "conditions.teamMember.teamId"?: string;
      "conditions.minRating.rating"?:
        | 1000
        | 1100
        | 1200
        | 1300
        | 1400
        | 1500
        | 1600
        | 1700
        | 1800
        | 1900
        | 2000
        | 2100
        | 2200
        | 2300
        | 2400
        | 2500
        | 2600;
      "conditions.maxRating.rating"?:
        | 2200
        | 2100
        | 2000
        | 1900
        | 1800
        | 1700
        | 1600
        | 1500
        | 1400
        | 1300
        | 1200
        | 1100
        | 1000
        | 900
        | 800;
      "conditions.nbRatedGame.nb"?:
        | 0
        | 5
        | 10
        | 15
        | 20
        | 30
        | 40
        | 50
        | 75
        | 100
        | 150
        | 200;
      "conditions.allowList"?: string;
      "conditions.bots"?: boolean;
      "conditions.accountAge"?:
        | 1
        | 3
        | 7
        | 14
        | 30
        | 60
        | 90
        | 180
        | 365
        | 730
        | 1095;
    };
  }) {
    const path = "/api/tournament";
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.ArenaTournamentFull },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Get info about an Arena tournament
   */
  async tournament(params: { id: string } & { page?: number }) {
    const path = `/api/tournament/${params.id}`;
    return await this.requestor.get(
      { path, query: { page: params.page } },
      { 200: { kind: "json", schema: schemas.ArenaTournamentFull } },
    );
  }

  /**
   * Update an Arena tournament
   */
  async apiTournamentUpdate(
    params: { id: string } & {
      body: {
        name?: string;
        clockTime:
          | 0
          | 0.25
          | 0.5
          | 0.75
          | 1
          | 1.5
          | 2
          | 3
          | 4
          | 5
          | 6
          | 7
          | 8
          | 10
          | 15
          | 20
          | 25
          | 30
          | 40
          | 50
          | 60;
        clockIncrement:
          | 0
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6
          | 7
          | 10
          | 15
          | 20
          | 25
          | 30
          | 40
          | 50
          | 60;
        minutes:
          | 20
          | 25
          | 30
          | 35
          | 40
          | 45
          | 50
          | 55
          | 60
          | 70
          | 80
          | 90
          | 100
          | 110
          | 120
          | 150
          | 180
          | 210
          | 240
          | 270
          | 300
          | 330
          | 360
          | 420
          | 480
          | 540
          | 600
          | 720;
        waitMinutes?: 1 | 2 | 3 | 5 | 10 | 15 | 20 | 30 | 45 | 60;
        startDate?: number;
        variant?: schemas.VariantKey;
        rated?: boolean;
        position?: schemas.FromPositionFEN;
        berserkable?: boolean;
        streakable?: boolean;
        hasChat?: boolean;
        description?: string;
        password?: string;
        "conditions.minRating.rating"?:
          | 1000
          | 1100
          | 1200
          | 1300
          | 1400
          | 1500
          | 1600
          | 1700
          | 1800
          | 1900
          | 2000
          | 2100
          | 2200
          | 2300
          | 2400
          | 2500
          | 2600;
        "conditions.maxRating.rating"?:
          | 2200
          | 2100
          | 2000
          | 1900
          | 1800
          | 1700
          | 1600
          | 1500
          | 1400
          | 1300
          | 1200
          | 1100
          | 1000
          | 900
          | 800;
        "conditions.nbRatedGame.nb"?:
          | 0
          | 5
          | 10
          | 15
          | 20
          | 30
          | 40
          | 50
          | 75
          | 100
          | 150
          | 200;
        "conditions.allowList"?: string;
        "conditions.bots"?: boolean;
        "conditions.accountAge"?:
          | 1
          | 3
          | 7
          | 14
          | 30
          | 60
          | 90
          | 180
          | 365
          | 730
          | 1095;
      };
    },
  ) {
    const path = `/api/tournament/${params.id}`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.ArenaTournamentFull },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Join an Arena tournament
   */
  async apiTournamentJoin(
    params: { id: string } & {
      body: {
        password?: string;
        team?: string;
        pairMeAsap?: boolean;
      };
    },
  ) {
    const path = `/api/tournament/${params.id}/join`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Pause or leave an Arena tournament
   */
  async apiTournamentWithdraw(params: { id: string }) {
    const path = `/api/tournament/${params.id}/withdraw`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Terminate an Arena tournament
   */
  async apiTournamentTerminate(params: { id: string }) {
    const path = `/api/tournament/${params.id}/terminate`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Update a team battle
   */
  async apiTournamentTeamBattlePost(
    params: { id: string } & {
      body: {
        teams: string;
        nbLeaders: number;
      };
    },
  ) {
    const path = `/api/tournament/team-battle/${params.id}`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.ArenaTournamentFull },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Export games of an Arena tournament
   */
  async gamesByTournament(
    params: { id: string } & {
      player?: string;
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
    },
  ) {
    const path = `/api/tournament/${params.id}/games`;
    return await this.requestor.get(
      {
        path,
        query: {
          player: params.player,
          moves: params.moves,
          pgnInJson: params.pgnInJson,
          tags: params.tags,
          clocks: params.clocks,
          evals: params.evals,
          accuracy: params.accuracy,
          opening: params.opening,
          division: params.division,
        },
      },
      { 200: { kind: "mixed" } },
    );
  }

  /**
   * Get results of an Arena tournament
   */
  async resultsByTournament(
    params: { id: string } & {
      nb?: number;
      sheet?: boolean;
    },
  ) {
    const path = `/api/tournament/${params.id}/results`;
    return await this.requestor.get(
      { path, query: { nb: params.nb, sheet: params.sheet } },
      {
        200: {
          kind: "ndjson",
          schema: z.object({
            rank: z.int(),
            score: z.int(),
            rating: z.int(),
            username: z.string(),
            performance: z.int(),
            title: z.optional(schemas.Title),
            team: z.optional(z.string()),
            flair: z.optional(schemas.Flair),
            patronColor: z.optional(schemas.PatronColor),
            sheet: z.optional(schemas.ArenaSheet),
          }),
        },
      },
    );
  }

  /**
   * Get team standing of a team battle
   */
  async teamsByTournament(params: { id: string }) {
    const path = `/api/tournament/${params.id}/teams`;
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "json",
          schema: z.object({
            id: z.string(),
            teams: z.array(
              z.object({
                rank: z.int(),
                id: z.string(),
                score: z.int(),
                players: z.array(
                  z.object({
                    user: schemas.LightUser,
                    score: z.optional(z.int()),
                  }),
                ),
              }),
            ),
          }),
        },
      },
    );
  }

  /**
   * Get tournaments created by a user
   */
  async apiUserNameTournamentCreated(
    params: { username: string } & {
      nb?: number;
      status?: 10 | 20 | 30;
    },
  ) {
    const path = `/api/user/${params.username}/tournament/created`;
    return await this.requestor.get(
      { path, query: { nb: params.nb, status: params.status } },
      { 200: { kind: "ndjson", schema: schemas.ArenaTournament } },
    );
  }

  /**
   * Get tournaments played by a user
   */
  async apiUserNameTournamentPlayed(
    params: { username: string } & {
      nb?: number;
      performance?: boolean;
    },
  ) {
    const path = `/api/user/${params.username}/tournament/played`;
    return await this.requestor.get(
      { path, query: { nb: params.nb, performance: params.performance } },
      { 200: { kind: "ndjson", schema: schemas.ArenaTournamentPlayed } },
    );
  }

  /**
   * Create a new Swiss tournament
   */
  async apiSwissNew(
    params: { teamId: string } & {
      body: {
        name?: string;
        "clock.limit":
          | 0
          | 15
          | 30
          | 45
          | 60
          | 90
          | 120
          | 180
          | 240
          | 300
          | 360
          | 420
          | 480
          | 600
          | 900
          | 1200
          | 1500
          | 1800
          | 2400
          | 3000
          | 3600
          | 4200
          | 4800
          | 5400
          | 6000
          | 6600
          | 7200
          | 7800
          | 8400
          | 9000
          | 9600
          | 10200
          | 10800;
        "clock.increment": number;
        nbRounds: number;
        startsAt?: number;
        roundInterval?:
          | -1
          | 5
          | 10
          | 20
          | 30
          | 45
          | 60
          | 120
          | 180
          | 300
          | 600
          | 900
          | 1200
          | 1800
          | 2700
          | 3600
          | 86400
          | 172800
          | 604800
          | 99999999;
        variant?: schemas.VariantKey;
        position?: schemas.SwissFromPositionFEN;
        description?: string;
        rated?: boolean;
        password?: string;
        forbiddenPairings?: string;
        manualPairings?: string;
        chatFor?: 0 | 10 | 20 | 30;
        "conditions.minRating.rating"?:
          | 1000
          | 1100
          | 1200
          | 1300
          | 1400
          | 1500
          | 1600
          | 1700
          | 1800
          | 1900
          | 2000
          | 2100
          | 2200
          | 2300
          | 2400
          | 2500
          | 2600;
        "conditions.maxRating.rating"?:
          | 2200
          | 2100
          | 2000
          | 1900
          | 1800
          | 1700
          | 1600
          | 1500
          | 1400
          | 1300
          | 1200
          | 1100
          | 1000
          | 900
          | 800;
        "conditions.nbRatedGame.nb"?: number;
        "conditions.playYourGames"?: boolean;
        "conditions.allowList"?: string;
      };
    },
  ) {
    const path = `/api/swiss/new/${params.teamId}`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.SwissTournament },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Get info about a Swiss tournament
   */
  async swiss(params: { id: string }) {
    const path = `/api/swiss/${params.id}`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.SwissTournament } },
    );
  }

  /**
   * Update a Swiss tournament
   */
  async apiSwissUpdate(
    params: { id: string } & {
      body: {
        name?: string;
        "clock.limit":
          | 0
          | 15
          | 30
          | 45
          | 60
          | 90
          | 120
          | 180
          | 240
          | 300
          | 360
          | 420
          | 480
          | 600
          | 900
          | 1200
          | 1500
          | 1800
          | 2400
          | 3000
          | 3600
          | 4200
          | 4800
          | 5400
          | 6000
          | 6600
          | 7200
          | 7800
          | 8400
          | 9000
          | 9600
          | 10200
          | 10800;
        "clock.increment": number;
        nbRounds: number;
        startsAt?: number;
        roundInterval?:
          | -1
          | 5
          | 10
          | 20
          | 30
          | 45
          | 60
          | 120
          | 180
          | 300
          | 600
          | 900
          | 1200
          | 1800
          | 2700
          | 3600
          | 86400
          | 172800
          | 604800
          | 99999999;
        variant?: schemas.VariantKey;
        position?: schemas.SwissFromPositionFEN;
        description?: string;
        rated?: boolean;
        password?: string;
        forbiddenPairings?: string;
        manualPairings?: string;
        chatFor?: 0 | 10 | 20 | 30;
        "conditions.minRating.rating"?:
          | 1000
          | 1100
          | 1200
          | 1300
          | 1400
          | 1500
          | 1600
          | 1700
          | 1800
          | 1900
          | 2000
          | 2100
          | 2200
          | 2300
          | 2400
          | 2500
          | 2600;
        "conditions.maxRating.rating"?:
          | 2200
          | 2100
          | 2000
          | 1900
          | 1800
          | 1700
          | 1600
          | 1500
          | 1400
          | 1300
          | 1200
          | 1100
          | 1000
          | 900
          | 800;
        "conditions.nbRatedGame.nb"?: number;
        "conditions.playYourGames"?: boolean;
        "conditions.allowList"?: string;
      };
    },
  ) {
    const path = `/api/swiss/${params.id}/edit`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.SwissTournament },
        400: { kind: "json", schema: schemas.BadRequestError },
        401: { kind: "json", schema: schemas.SwissUnauthorisedEdit },
      },
    );
  }

  /**
   * Manually schedule the next round
   */
  async apiSwissScheduleNextRound(
    params: { id: string } & { body: { date?: number } },
  ) {
    const path = `/api/swiss/${params.id}/schedule-next-round`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        204: { kind: "nocontent" },
        400: { kind: "json", schema: schemas.BadRequestError },
        401: { kind: "json", schema: schemas.SwissUnauthorisedEdit },
      },
    );
  }

  /**
   * Join a Swiss tournament
   */
  async apiSwissJoin(params: { id: string } & { body: { password?: string } }) {
    const path = `/api/swiss/${params.id}/join`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Pause or leave a swiss tournament
   */
  async apiSwissWithdraw(params: { id: string }) {
    const path = `/api/swiss/${params.id}/withdraw`;
    return await this.requestor.post(
      { path },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Terminate a Swiss tournament
   */
  async apiSwissTerminate(params: { id: string }) {
    const path = `/api/swiss/${params.id}/terminate`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Export TRF of a Swiss tournament
   */
  async swissTrf(params: { id: string }) {
    const path = `/swiss/${params.id}.trf`;
    return await this.requestor.get({ path }, { 200: { kind: "mixed" } });
  }

  /**
   * Export games of a Swiss tournament
   */
  async gamesBySwiss(
    params: { id: string } & {
      player?: string;
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
    },
  ) {
    const path = `/api/swiss/${params.id}/games`;
    return await this.requestor.get(
      {
        path,
        query: {
          player: params.player,
          moves: params.moves,
          pgnInJson: params.pgnInJson,
          tags: params.tags,
          clocks: params.clocks,
          evals: params.evals,
          accuracy: params.accuracy,
          opening: params.opening,
          division: params.division,
        },
      },
      { 200: { kind: "mixed" } },
    );
  }

  /**
   * Get results of a swiss tournament
   */
  async resultsBySwiss(params: { id: string } & { nb?: number }) {
    const path = `/api/swiss/${params.id}/results`;
    return await this.requestor.get(
      { path, query: { nb: params.nb } },
      {
        200: {
          kind: "ndjson",
          schema: z.object({
            absent: z.optional(z.boolean()),
            rank: z.int(),
            points: z.number(),
            tieBreak: z.int(),
            rating: z.int(),
            username: z.string(),
            title: z.optional(schemas.Title),
            performance: z.int(),
          }),
        },
      },
    );
  }

  /**
   * Get team swiss tournaments
   */
  async apiTeamSwiss(
    params: { teamId: string } & {
      max?: number;
      status?: schemas.SwissStatus;
      createdBy?: string;
      name?: string;
    },
  ) {
    const path = `/api/team/${params.teamId}/swiss`;
    return await this.requestor.get(
      {
        path,
        query: {
          max: params.max,
          status: params.status,
          createdBy: params.createdBy,
          name: params.name,
        },
      },
      { 200: { kind: "ndjson", schema: schemas.SwissTournament } },
    );
  }

  /**
   * Export one study chapter
   */
  async studyChapterPgn(
    params: {
      studyId: string;
      chapterId: string;
    } & {
      clocks?: boolean;
      comments?: boolean;
      variations?: boolean;
      orientation?: boolean;
    },
  ) {
    const path = `/api/study/${params.studyId}/${params.chapterId}.pgn`;
    return await this.requestor.get(
      {
        path,
        query: {
          clocks: params.clocks,
          comments: params.comments,
          variations: params.variations,
          orientation: params.orientation,
        },
      },
      { 200: { kind: "chess-pgn" } },
    );
  }

  /**
   * Export all chapters
   */
  async studyAllChaptersPgn(
    params: { studyId: string } & {
      clocks?: boolean;
      comments?: boolean;
      variations?: boolean;
      orientation?: boolean;
    },
  ) {
    const path = `/api/study/${params.studyId}.pgn`;
    return await this.requestor.get(
      {
        path,
        query: {
          clocks: params.clocks,
          comments: params.comments,
          variations: params.variations,
          orientation: params.orientation,
        },
      },
      { 200: { kind: "chess-pgn" } },
    );
  }

  /**
   * Study metadata
   */
  async studyAllChaptersHead(params: { studyId: string }) {
    const path = `/api/study/${params.studyId}.pgn`;
    return await this.requestor.head({ path }, { 204: { kind: "nocontent" } });
  }

  /**
   * Create a new Study
   */
  async apiStudyPost(params: {
    body: {
      name: string;
      visibility: "public" | "unlisted" | "private";
      flair?: schemas.Flair;
      computer: schemas.StudyUserSelection;
      explorer: schemas.StudyUserSelection;
      cloneable: schemas.StudyUserSelection;
      shareable: schemas.StudyUserSelection;
      chat: schemas.StudyUserSelection;
      sticky?: boolean;
      description?: boolean;
    };
  }) {
    const path = "/api/study";
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: z.object({ id: z.optional(z.string()) }) },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Import PGN into a study
   */
  async apiStudyImportPGN(
    params: { studyId: string } & {
      body: {
        pgn: string;
        name?: string;
        orientation?: "white" | "black";
        variant?: schemas.VariantKey;
        mode?: "practice" | "conceal" | "gamebook";
      };
    },
  ) {
    const path = `/api/study/${params.studyId}/import-pgn`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.StudyImportPgnChapters },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Update PGN tags of a study chapter
   */
  async apiStudyChapterTags(
    params: {
      studyId: string;
      chapterId: string;
    } & { body: { pgn: string } },
  ) {
    const path = `/api/study/${params.studyId}/${params.chapterId}/tags`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        204: { kind: "nocontent" },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Update the moves of a study chapter
   */
  async apiStudyChapterMoves(
    params: {
      studyId: string;
      chapterId: string;
    } & { body: { pgn: string } },
  ) {
    const path = `/api/study/${params.studyId}/${params.chapterId}/moves`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        204: { kind: "nocontent" },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Export all studies of a user
   */
  async studyExportAllPgn(
    params: { username: string } & {
      clocks?: boolean;
      comments?: boolean;
      variations?: boolean;
      orientation?: boolean;
    },
  ) {
    const path = `/api/study/by/${params.username}/export.pgn`;
    return await this.requestor.get(
      {
        path,
        query: {
          clocks: params.clocks,
          comments: params.comments,
          variations: params.variations,
          orientation: params.orientation,
        },
      },
      { 200: { kind: "chess-pgn" } },
    );
  }

  /**
   * List studies of a user
   */
  async studyListMetadata(params: { username: string }) {
    const path = `/api/study/by/${params.username}`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "ndjson", schema: schemas.StudyMetadata } },
    );
  }

  /**
   * Delete a study chapter
   */
  async apiStudyStudyIdChapterIdDelete(params: {
    studyId: string;
    chapterId: string;
  }) {
    const path = `/api/study/${params.studyId}/${params.chapterId}`;
    return await this.requestor.delete(
      { path },
      { 204: { kind: "nocontent" } },
    );
  }

  /**
   * Get official broadcasts
   */
  async broadcastsOfficial(params: {
    nb?: number;
    html?: boolean;
    live?: boolean;
  }) {
    const path = "/api/broadcast";
    return await this.requestor.get(
      { path, query: params },
      { 200: { kind: "ndjson", schema: schemas.BroadcastWithRounds } },
    );
  }

  /**
   * Get paginated top broadcast previews
   */
  async broadcastsTop(params: { page?: number; html?: boolean }) {
    const path = "/api/broadcast/top";
    return await this.requestor.get(
      { path, query: params },
      { 200: { kind: "json", schema: schemas.BroadcastTop } },
    );
  }

  /**
   * Get broadcasts created by a user
   */
  async broadcastsByUser(
    params: { username: string } & {
      page?: number;
      html?: boolean;
    },
  ) {
    const path = `/api/broadcast/by/${params.username}`;
    return await this.requestor.get(
      { path, query: { page: params.page, html: params.html } },
      {
        200: {
          kind: "json",
          schema: z.object({
            currentPage: z.int(),
            maxPerPage: z.int(),
            currentPageResults: z.array(schemas.BroadcastByUser),
            nbResults: z.int(),
            previousPage: z.nullable(z.int()),
            nextPage: z.nullable(z.int()),
            nbPages: z.int(),
          }),
        },
      },
    );
  }

  /**
   * Search broadcasts
   */
  async broadcastsSearch(params: { page?: number; q?: string }) {
    const path = "/api/broadcast/search";
    return await this.requestor.get(
      { path, query: params },
      {
        200: {
          kind: "json",
          schema: z.object({
            currentPage: z.int(),
            maxPerPage: z.int(),
            currentPageResults: z.array(schemas.BroadcastWithLastRound),
            previousPage: z.nullable(z.int()),
            nextPage: z.nullable(z.int()),
          }),
        },
      },
    );
  }

  /**
   * Create a broadcast tournament
   */
  async broadcastTourCreate(params: { body: schemas.BroadcastForm }) {
    const path = "/broadcast/new";
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.BroadcastWithRounds },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Get a broadcast tournament
   */
  async broadcastTourGet(params: { broadcastTournamentId: string }) {
    const path = `/api/broadcast/${params.broadcastTournamentId}`;
    return await this.requestor.get(
      { path },
      {
        200: { kind: "json", schema: schemas.BroadcastWithRoundsAndFullGroup },
      },
    );
  }

  /**
   * Get players of a broadcast
   */
  async broadcastPlayersGet(params: { broadcastTournamentId: string }) {
    const path = `/broadcast/${params.broadcastTournamentId}/players`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: z.array(schemas.BroadcastPlayerEntry) } },
    );
  }

  /**
   * Get a player of a broadcast
   */
  async broadcastPlayerGet(params: {
    broadcastTournamentId: string;
    playerId: string;
  }) {
    const path = `/broadcast/${params.broadcastTournamentId}/players/${params.playerId}`;
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "json",
          schema: schemas.BroadcastPlayerEntryWithFideAndGames,
        },
        404: { kind: "json", schema: schemas.NotFound },
      },
    );
  }

  /**
   * Get the team leaderboard of a broadcast
   */
  async broadcastTeamLeaderboardGet(params: { broadcastTournamentId: string }) {
    const path = `/broadcast/${params.broadcastTournamentId}/teams/standings`;
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "json",
          schema: z.array(schemas.BroadcastTeamLeaderboardEntry),
        },
        404: { kind: "nocontent" },
      },
    );
  }

  /**
   * Update your broadcast tournament
   */
  async broadcastTourUpdate(
    params: { broadcastTournamentId: string } & { body: schemas.BroadcastForm },
  ) {
    const path = `/broadcast/${params.broadcastTournamentId}/edit`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Create a broadcast round
   */
  async broadcastRoundCreate(
    params: { broadcastTournamentId: string } & {
      body: schemas.BroadcastRoundForm;
    },
  ) {
    const path = `/broadcast/${params.broadcastTournamentId}/new`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.BroadcastRoundNew },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Get a broadcast round
   */
  async broadcastRoundGet(params: {
    broadcastTournamentSlug: string;
    broadcastRoundSlug: string;
    broadcastRoundId: string;
  }) {
    const path = `/api/broadcast/${params.broadcastTournamentSlug}/${params.broadcastRoundSlug}/${params.broadcastRoundId}`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.BroadcastRound } },
    );
  }

  /**
   * Update a broadcast round
   */
  async broadcastRoundUpdate(
    params: { broadcastRoundId: string } & { body: schemas.BroadcastRoundForm },
  ) {
    const path = `/broadcast/round/${params.broadcastRoundId}/edit`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.BroadcastRound },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Reset a broadcast round
   */
  async broadcastRoundReset(params: { broadcastRoundId: string }) {
    const path = `/api/broadcast/round/${params.broadcastRoundId}/reset`;
    return await this.requestor.post(
      { path },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Push PGN to a broadcast round
   */
  async broadcastPush(params: { broadcastRoundId: string } & { body: string }) {
    const path = `/api/broadcast/round/${params.broadcastRoundId}/push`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.BroadcastPgnPush },
        400: {
          kind: "json",
          schema: z.object({ error: z.optional(z.string()) }),
        },
      },
    );
  }

  /**
   * Stream an ongoing broadcast round as PGN
   */
  async broadcastStreamRoundPgn(
    params: { broadcastRoundId: string } & {
      clocks?: boolean;
      comments?: boolean;
    },
  ) {
    const path = `/api/stream/broadcast/round/${params.broadcastRoundId}.pgn`;
    return await this.requestor.get(
      { path, query: { clocks: params.clocks, comments: params.comments } },
      { 200: { kind: "chess-pgn" } },
    );
  }

  /**
   * Stream ongoing broadcast rounds of a group as PGN
   */
  async broadcastStreamGroupPgn(
    params: { broadcastGroupId: string } & {
      clocks?: boolean;
      comments?: boolean;
    },
  ) {
    const path = `/api/stream/broadcast/group/${params.broadcastGroupId}.pgn`;
    return await this.requestor.get(
      { path, query: { clocks: params.clocks, comments: params.comments } },
      { 200: { kind: "chess-pgn" } },
    );
  }

  /**
   * Export one round as PGN
   */
  async broadcastRoundPgn(
    params: { broadcastRoundId: string } & {
      clocks?: boolean;
      comments?: boolean;
    },
  ) {
    const path = `/api/broadcast/round/${params.broadcastRoundId}.pgn`;
    return await this.requestor.get(
      { path, query: { clocks: params.clocks, comments: params.comments } },
      { 200: { kind: "chess-pgn" } },
    );
  }

  /**
   * Export all rounds as PGN
   */
  async broadcastAllRoundsPgn(
    params: { broadcastTournamentId: string } & {
      clocks?: boolean;
      comments?: boolean;
    },
  ) {
    const path = `/api/broadcast/${params.broadcastTournamentId}.pgn`;
    return await this.requestor.get(
      { path, query: { clocks: params.clocks, comments: params.comments } },
      { 200: { kind: "chess-pgn" } },
    );
  }

  /**
   * Get your broadcast rounds
   */
  async broadcastMyRoundsGet(params: { nb?: number }) {
    const path = "/api/broadcast/my-rounds";
    return await this.requestor.get(
      { path, query: params },
      { 200: { kind: "ndjson", schema: schemas.BroadcastMyRound } },
    );
  }

  /**
   * Get a FIDE player
   */
  async fidePlayerGet(params: { playerId: number }) {
    const path = `/api/fide/player/${params.playerId}`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.FIDEPlayer } },
    );
  }

  /**
   * Get ratings history of a FIDE player
   */
  async fidePlayerRatings(params: { playerId: number }) {
    const path = `/api/fide/player/${params.playerId}/ratings`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.FIDEPlayerRatings } },
    );
  }

  /**
   * Search FIDE players
   */
  async fidePlayerSearch(params: { q: string }) {
    const path = "/api/fide/player";
    return await this.requestor.get(
      { path, query: params },
      { 200: { kind: "json", schema: z.array(schemas.FIDEPlayer) } },
    );
  }

  /**
   * Get current simuls
   */
  async apiSimul() {
    const path = "/api/simul";
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "json",
          schema: z.object({
            pending: z.optional(z.array(schemas.Simul)),
            created: z.optional(z.array(schemas.Simul)),
            started: z.optional(z.array(schemas.Simul)),
            finished: z.optional(z.array(schemas.Simul)),
          }),
        },
      },
    );
  }

  /**
   * Get a single team
   */
  async teamShow(params: { teamId: string }) {
    const path = `/api/team/${params.teamId}`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.Team } },
    );
  }

  /**
   * Get popular teams
   */
  async teamAll(params: { page?: number }) {
    const path = "/api/team/all";
    return await this.requestor.get(
      { path, query: params },
      { 200: { kind: "json", schema: schemas.TeamPaginatorJson } },
    );
  }

  /**
   * Teams of a player
   */
  async teamOfUsername(params: { username: string }) {
    const path = `/api/team/of/${params.username}`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: z.array(schemas.Team) } },
    );
  }

  /**
   * Search teams
   */
  async teamSearch(params: { text?: string; page?: number }) {
    const path = "/api/team/search";
    return await this.requestor.get(
      { path, query: params },
      { 200: { kind: "json", schema: schemas.TeamPaginatorJson } },
    );
  }

  /**
   * Get members of a team
   */
  async teamIdUsers(params: { teamId: string } & { full?: boolean }) {
    const path = `/api/team/${params.teamId}/users`;
    return await this.requestor.get(
      { path, query: { full: params.full } },
      {
        200: {
          kind: "ndjson",
          schema: z.object({
            joinedTeamAt: z.optional(z.int()),
            id: z.string(),
            name: z.string(),
            title: z.optional(schemas.Title),
            patronColor: z.optional(schemas.PatronColor),
          }),
        },
      },
    );
  }

  /**
   * Get team Arena tournaments
   */
  async apiTeamArena(
    params: { teamId: string } & {
      max?: number;
      status?: schemas.ArenaStatusName;
      createdBy?: string;
      name?: string;
    },
  ) {
    const path = `/api/team/${params.teamId}/arena`;
    return await this.requestor.get(
      {
        path,
        query: {
          max: params.max,
          status: params.status,
          createdBy: params.createdBy,
          name: params.name,
        },
      },
      { 200: { kind: "ndjson", schema: schemas.ArenaTournament } },
    );
  }

  /**
   * Join a team
   */
  async teamIdJoin(
    params: { teamId: string } & {
      body: {
        message?: string;
        password?: string;
      };
    },
  ) {
    const path = `/team/${params.teamId}/join`;
    return await this.requestor.post(
      { path, body: params.body },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Leave a team
   */
  async teamIdQuit(params: { teamId: string }) {
    const path = `/team/${params.teamId}/quit`;
    return await this.requestor.post(
      { path },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Get join requests
   */
  async teamRequests(params: { teamId: string } & { declined?: boolean }) {
    const path = `/api/team/${params.teamId}/requests`;
    return await this.requestor.get(
      { path, query: { declined: params.declined } },
      { 200: { kind: "json", schema: z.array(schemas.TeamRequestWithUser) } },
    );
  }

  /**
   * Accept join request
   */
  async teamRequestAccept(params: { teamId: string; userId: string }) {
    const path = `/api/team/${params.teamId}/request/${params.userId}/accept`;
    return await this.requestor.post(
      { path },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Decline join request
   */
  async teamRequestDecline(params: { teamId: string; userId: string }) {
    const path = `/api/team/${params.teamId}/request/${params.userId}/decline`;
    return await this.requestor.post(
      { path },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Kick a user from your team
   */
  async teamIdKickUserId(params: { teamId: string; userId: string }) {
    const path = `/api/team/${params.teamId}/kick/${params.userId}`;
    return await this.requestor.post(
      { path },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Message all members
   */
  async teamIdPmAll(
    params: { teamId: string } & { body: { message?: string } },
  ) {
    const path = `/team/${params.teamId}/pm-all`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Get live streamers
   */
  async streamerLive() {
    const path = "/api/streamer/live";
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "json",
          schema: z.array(
            z.intersection(
              schemas.LightUser,
              z.object({
                stream: z.optional(
                  z.object({
                    service: z.optional(z.literal(["twitch", "youtube"])),
                    status: z.optional(z.string()),
                    lang: z.optional(z.string()),
                  }),
                ),
                streamer: z.optional(
                  z.object({
                    name: z.optional(z.string()),
                    headline: z.optional(z.string()),
                    description: z.optional(z.string()),
                    twitch: z.optional(z.url()),
                    youtube: z.optional(z.url()),
                    image: z.optional(z.url()),
                  }),
                ),
              }),
            ),
          ),
        },
      },
    );
  }

  /**
   * Get crosstable
   */
  async apiCrosstable(
    params: {
      user1: string;
      user2: string;
    } & { matchup?: boolean },
  ) {
    const path = `/api/crosstable/${params.user1}/${params.user2}`;
    return await this.requestor.get(
      { path, query: { matchup: params.matchup } },
      { 200: { kind: "json", schema: schemas.Crosstable } },
    );
  }

  /**
   * Autocomplete usernames
   */
  async apiPlayerAutocomplete(params: {
    term: string;
    exists?: boolean;
    object?: boolean;
    names?: boolean;
    friend?: boolean;
    team?: string;
    tour?: string;
    swiss?: string;
    teacher?: boolean;
  }) {
    const path = "/api/player/autocomplete";
    return await this.requestor.get(
      { path, query: params },
      {
        200: {
          kind: "json",
          schema: z.union([
            z.array(z.string()),
            z.object({ result: z.optional(z.array(schemas.LightUserOnline)) }),
          ]),
        },
      },
    );
  }

  /**
   * Get notes for a user
   */
  async readNote(params: { username: string }) {
    const path = `/api/user/${params.username}/note`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: z.array(schemas.UserNote) } },
    );
  }

  /**
   * Add a note for a user
   */
  async writeNote(params: { username: string } & { body: { text: string } }) {
    const path = `/api/user/${params.username}/note`;
    return await this.requestor.post(
      { path, body: params.body },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Get users followed by the logged in user
   */
  async apiUserFollowing() {
    const path = "/api/rel/following";
    return await this.requestor.get(
      { path },
      { 200: { kind: "ndjson", schema: schemas.UserExtended } },
    );
  }

  /**
   * Follow a player
   */
  async followUser(params: { username: string }) {
    const path = `/api/rel/follow/${params.username}`;
    return await this.requestor.post(
      { path },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Unfollow a player
   */
  async unfollowUser(params: { username: string }) {
    const path = `/api/rel/unfollow/${params.username}`;
    return await this.requestor.post(
      { path },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Block a player
   */
  async blockUser(params: { username: string }) {
    const path = `/api/rel/block/${params.username}`;
    return await this.requestor.post(
      { path },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Unblock a player
   */
  async unblockUser(params: { username: string }) {
    const path = `/api/rel/unblock/${params.username}`;
    return await this.requestor.post(
      { path },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Stream incoming events
   */
  async apiStreamEvent() {
    const path = "/api/stream/event";
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "ndjson",
          schema: z.union([
            schemas.GameStartEvent,
            schemas.GameFinishEvent,
            schemas.ChallengeEvent,
            schemas.ChallengeCanceledEvent,
            schemas.ChallengeDeclinedEvent,
          ]),
        },
      },
    );
  }

  /**
   * Create a seek
   */
  async apiBoardSeek(params: {
    body: {
      rated?: boolean;
      variant?: schemas.VariantKey;
      ratingRange?: string;
    } & (
      | {
          time: number;
          increment: number;
          color?: schemas.ChallengeColor;
        }
      | { days: 1 | 2 | 3 | 5 | 7 | 10 | 14 }
    );
  }) {
    const path = "/api/board/seek";
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "mixed" },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Stream Board game state
   */
  async boardGameStream(params: { gameId: string }) {
    const path = `/api/board/game/stream/${params.gameId}`;
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "ndjson",
          schema: z.union([
            schemas.GameFullEvent,
            schemas.GameStateEvent,
            schemas.ChatLineEvent,
            schemas.OpponentGoneEvent,
          ]),
        },
        404: { kind: "json", schema: schemas.NotFound },
      },
    );
  }

  /**
   * Make a Board move
   */
  async boardGameMove(
    params: {
      gameId: string;
      move: string;
    } & { offeringDraw?: boolean },
  ) {
    const path = `/api/board/game/${params.gameId}/move/${params.move}`;
    return await this.requestor.post(
      { path, query: { offeringDraw: params.offeringDraw } },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Fetch the player chat
   */
  async boardGameChatGet(params: { gameId: string }) {
    const path = `/api/board/game/${params.gameId}/chat`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "ndjson", schema: schemas.PlayerGameChat } },
    );
  }

  /**
   * Write in the chat
   */
  async boardGameChatPost(
    params: { gameId: string } & {
      body: {
        room: "player" | "spectator";
        text: string;
      };
    },
  ) {
    const path = `/api/board/game/${params.gameId}/chat`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Abort a game
   */
  async boardGameAbort(params: { gameId: string }) {
    const path = `/api/board/game/${params.gameId}/abort`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Resign a game
   */
  async boardGameResign(params: { gameId: string }) {
    const path = `/api/board/game/${params.gameId}/resign`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Handle draw offers
   */
  async boardGameDraw(params: { gameId: string; accept: boolean }) {
    const path = `/api/board/game/${params.gameId}/draw/${params.accept}`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Handle takeback offers
   */
  async boardGameTakeback(params: { gameId: string; accept: boolean }) {
    const path = `/api/board/game/${params.gameId}/takeback/${params.accept}`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Claim victory of a game
   */
  async boardGameClaimVictory(params: { gameId: string }) {
    const path = `/api/board/game/${params.gameId}/claim-victory`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Claim draw of a game
   */
  async boardGameClaimDraw(params: { gameId: string }) {
    const path = `/api/board/game/${params.gameId}/claim-draw`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Berserk a tournament game
   */
  async boardGameBerserk(params: { gameId: string }) {
    const path = `/api/board/game/${params.gameId}/berserk`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Get online bots
   */
  async apiBotOnline(params: { nb?: number }) {
    const path = "/api/bot/online";
    return await this.requestor.get(
      { path, query: params },
      { 200: { kind: "ndjson", schema: schemas.User } },
    );
  }

  /**
   * Upgrade to Bot account
   */
  async botAccountUpgrade() {
    const path = "/api/bot/account/upgrade";
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Stream Bot game state
   */
  async botGameStream(params: { gameId: string }) {
    const path = `/api/bot/game/stream/${params.gameId}`;
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "ndjson",
          schema: z.union([
            schemas.GameFullEvent,
            schemas.GameStateEvent,
            schemas.ChatLineEvent,
            schemas.OpponentGoneEvent,
          ]),
        },
        404: { kind: "json", schema: schemas.NotFound },
      },
    );
  }

  /**
   * Make a Bot move
   */
  async botGameMove(
    params: {
      gameId: string;
      move: string;
    } & { offeringDraw?: boolean },
  ) {
    const path = `/api/bot/game/${params.gameId}/move/${params.move}`;
    return await this.requestor.post(
      { path, query: { offeringDraw: params.offeringDraw } },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Fetch the game chat
   */
  async botGameChatGet(params: { gameId: string }) {
    const path = `/api/bot/game/${params.gameId}/chat`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "ndjson", schema: schemas.PlayerGameChat } },
    );
  }

  /**
   * Write in the chat
   */
  async botGameChat(
    params: { gameId: string } & {
      body: {
        room: "player" | "spectator";
        text: string;
      };
    },
  ) {
    const path = `/api/bot/game/${params.gameId}/chat`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Abort a game
   */
  async botGameAbort(params: { gameId: string }) {
    const path = `/api/bot/game/${params.gameId}/abort`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Resign a game
   */
  async botGameResign(params: { gameId: string }) {
    const path = `/api/bot/game/${params.gameId}/resign`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Handle draw offers
   */
  async botGameDraw(params: { gameId: string; accept: boolean }) {
    const path = `/api/bot/game/${params.gameId}/draw/${params.accept}`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Handle takeback offers
   */
  async botGameTakeback(params: { gameId: string; accept: boolean }) {
    const path = `/api/bot/game/${params.gameId}/takeback/${params.accept}`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Claim victory of a game
   */
  async botGameClaimVictory(params: { gameId: string }) {
    const path = `/api/bot/game/${params.gameId}/claim-victory`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Claim draw of a game
   */
  async botGameClaimDraw(params: { gameId: string }) {
    const path = `/api/bot/game/${params.gameId}/claim-draw`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * List your challenges
   */
  async challengeList() {
    const path = "/api/challenge";
    return await this.requestor.get(
      { path },
      {
        200: {
          kind: "json",
          schema: z.object({
            in: z.optional(z.array(schemas.ChallengeJson)),
            out: z.optional(z.array(schemas.ChallengeJson)),
          }),
        },
      },
    );
  }

  /**
   * Create a challenge
   */
  async challengeCreate(
    params: { username: string } & {
      body: (
        | {
            "clock.limit": number;
            "clock.increment": number;
          }
        | { days: 1 | 2 | 3 | 5 | 7 | 10 | 14 }
        | Record<string, never>
      ) & {
        rated?: boolean;
        color?: schemas.ChallengeColor;
        variant?: schemas.VariantKey;
        fen?: schemas.FromPositionFEN;
        keepAliveStream?: boolean;
        rules?:
          | "noAbort"
          | "noRematch"
          | "noGiveTime"
          | "noClaimWin"
          | "noEarlyDraw";
      };
    },
  ) {
    const path = `/api/challenge/${params.username}`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.ChallengeJson },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Show one challenge
   */
  async challengeShow(params: { challengeId: string }) {
    const path = `/api/challenge/${params.challengeId}/show`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.ChallengeJson } },
    );
  }

  /**
   * Accept a challenge
   */
  async challengeAccept(
    params: { challengeId: string } & { color?: "white" | "black" },
  ) {
    const path = `/api/challenge/${params.challengeId}/accept`;
    return await this.requestor.post(
      { path, query: { color: params.color } },
      {
        200: { kind: "json", schema: schemas.Ok },
        404: { kind: "json", schema: schemas.NotFound },
      },
    );
  }

  /**
   * Decline a challenge
   */
  async challengeDecline(
    params: { challengeId: string } & {
      body: {
        reason?:
          | "generic"
          | "later"
          | "tooFast"
          | "tooSlow"
          | "timeControl"
          | "rated"
          | "casual"
          | "standard"
          | "variant"
          | "noBot"
          | "onlyBot";
      };
    },
  ) {
    const path = `/api/challenge/${params.challengeId}/decline`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.Ok },
        404: { kind: "json", schema: schemas.NotFound },
      },
    );
  }

  /**
   * Cancel a challenge
   */
  async challengeCancel(
    params: { challengeId: string } & { opponentToken?: string },
  ) {
    const path = `/api/challenge/${params.challengeId}/cancel`;
    return await this.requestor.post(
      { path, query: { opponentToken: params.opponentToken } },
      {
        200: { kind: "json", schema: schemas.Ok },
        404: { kind: "json", schema: schemas.NotFound },
      },
    );
  }

  /**
   * Challenge the AI
   */
  async challengeAi(params: {
    body: {
      level: number;
      "clock.limit"?: number;
      "clock.increment"?: number;
      days?: 1 | 2 | 3 | 5 | 7 | 10 | 14;
      color?: schemas.ChallengeColor;
      variant?: schemas.VariantKey;
      fen?: schemas.FromPositionFEN;
    };
  }) {
    const path = "/api/challenge/ai";
    return await this.requestor.post(
      { path, body: params.body },
      {
        201: {
          kind: "json",
          schema: z.object({
            id: z.optional(
              z.string().check(z.minLength(8)).check(z.maxLength(8)),
            ),
            variant: z.optional(schemas.Variant),
            speed: z.optional(schemas.Speed),
            perf: z.optional(schemas.PerfType),
            rated: z.optional(z.boolean()),
            fen: z.optional(z.string()),
            turns: z.optional(z.int()),
            source: z.optional(schemas.GameSource),
            status: z.optional(schemas.GameStatus),
            createdAt: z.optional(z.int()),
            player: z.optional(schemas.GameColor),
            fullId: z.optional(
              z.string().check(z.minLength(12)).check(z.maxLength(12)),
            ),
          }),
        },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Open-ended challenge
   */
  async challengeOpen(params: {
    body: {
      rated?: boolean;
      "clock.limit"?: number;
      "clock.increment"?: number;
      days?: 1 | 2 | 3 | 5 | 7 | 10 | 14;
      variant?: schemas.VariantKey;
      fen?: schemas.FromPositionFEN;
      name?: string;
      rules?:
        | "noRematch"
        | "noGiveTime"
        | "noClaimWin"
        | "noEarlyDraw"
        | "noAbort";
      users?: string;
      expiresAt?: number;
    };
  }) {
    const path = "/api/challenge/open";
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.ChallengeOpenJson },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Start clocks of a game
   */
  async challengeStartClocks(
    params: { gameId: string } & {
      token1: string;
      token2?: string;
    },
  ) {
    const path = `/api/challenge/${params.gameId}/start-clocks`;
    return await this.requestor.post(
      { path, query: { token1: params.token1, token2: params.token2 } },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * View your bulk pairings
   */
  async bulkPairingList() {
    const path = "/api/bulk-pairing";
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: z.array(schemas.BulkPairing) } },
    );
  }

  /**
   * Create a bulk pairing
   */
  async bulkPairingCreate(params: {
    body: {
      players?: string;
      "clock.limit"?: number;
      "clock.increment"?: number;
      days?: 1 | 2 | 3 | 5 | 7 | 10 | 14;
      pairAt?: number;
      startClocksAt?: number;
      rated?: boolean;
      variant?: schemas.VariantKey;
      fen?: schemas.FromPositionFEN;
      message?: string;
      rules?:
        | "noAbort"
        | "noRematch"
        | "noGiveTime"
        | "noClaimWin"
        | "noEarlyDraw";
    };
  }) {
    const path = "/api/bulk-pairing";
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.BulkPairing },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Manually start clocks
   */
  async bulkPairingStartClocks(params: { id: string }) {
    const path = `/api/bulk-pairing/${params.id}/start-clocks`;
    return await this.requestor.post(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        404: { kind: "json", schema: schemas.NotFound },
      },
    );
  }

  /**
   * Show a bulk pairing
   */
  async bulkPairingGet(params: { id: string }) {
    const path = `/api/bulk-pairing/${params.id}`;
    return await this.requestor.get(
      { path },
      {
        200: { kind: "json", schema: schemas.BulkPairing },
        404: { kind: "json", schema: schemas.NotFound },
      },
    );
  }

  /**
   * Cancel a bulk pairing
   */
  async bulkPairingDelete(params: { id: string }) {
    const path = `/api/bulk-pairing/${params.id}`;
    return await this.requestor.delete(
      { path },
      {
        200: { kind: "json", schema: schemas.Ok },
        404: { kind: "json", schema: schemas.NotFound },
      },
    );
  }

  /**
   * Export games of a bulk pairing
   */
  async bulkPairingIdGamesGet(
    params: { id: string } & {
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
      literate?: boolean;
    },
  ) {
    const path = `/api/bulk-pairing/${params.id}/games`;
    return await this.requestor.get(
      {
        path,
        query: {
          moves: params.moves,
          pgnInJson: params.pgnInJson,
          tags: params.tags,
          clocks: params.clocks,
          evals: params.evals,
          accuracy: params.accuracy,
          opening: params.opening,
          division: params.division,
          literate: params.literate,
        },
      },
      { 200: { kind: "mixed" } },
    );
  }

  /**
   * Add time to the opponent clock
   */
  async roundAddTime(params: { gameId: string; seconds: number }) {
    const path = `/api/round/${params.gameId}/add-time/${params.seconds}`;
    return await this.requestor.post(
      { path },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Admin challenge tokens
   */
  async adminChallengeTokens(params: {
    body: {
      users: string;
      description: string;
    };
  }) {
    const path = "/api/token/admin-challenge";
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: z.record(z.string(), z.string()) },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Send a private message
   */
  async inboxUsername(
    params: { username: string } & { body: { text: string } },
  ) {
    const path = `/inbox/${params.username}`;
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: { kind: "json", schema: schemas.Ok },
        400: { kind: "json", schema: schemas.BadRequestError },
      },
    );
  }

  /**
   * Get cloud evaluation of a position.
   */
  async apiCloudEval(params: {
    fen: string;
    multiPv?: number;
    variant?: schemas.VariantKey;
  }) {
    const path = "/api/cloud-eval";
    return await this.requestor.get(
      { path, query: params },
      {
        200: { kind: "json", schema: schemas.CloudEval },
        404: {
          kind: "json",
          schema: z.object({ error: z.optional(z.string()) }),
        },
      },
    );
  }

  /**
   * List external engines
   */
  async apiExternalEngineList() {
    const path = "/api/external-engine";
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: z.array(schemas.ExternalEngine) } },
    );
  }

  /**
   * Create external engine
   */
  async apiExternalEngineCreate(params: {
    body: schemas.ExternalEngineRegistration;
  }) {
    const path = "/api/external-engine";
    return await this.requestor.post(
      { path, body: params.body },
      { 200: { kind: "json", schema: schemas.ExternalEngine } },
    );
  }

  /**
   * Get external engine
   */
  async apiExternalEngineGet(params: { id: string }) {
    const path = `/api/external-engine/${params.id}`;
    return await this.requestor.get(
      { path },
      { 200: { kind: "json", schema: schemas.ExternalEngine } },
    );
  }

  /**
   * Delete external engine
   */
  async apiExternalEngineDelete(params: { id: string }) {
    const path = `/api/external-engine/${params.id}`;
    return await this.requestor.delete(
      { path },
      { 200: { kind: "json", schema: schemas.Ok } },
    );
  }

  /**
   * Update external engine
   */
  async apiExternalEnginePut(
    params: { id: string } & { body: schemas.ExternalEngineRegistration },
  ) {
    const path = `/api/external-engine/${params.id}`;
    return await this.requestor.put(
      { path, body: params.body },
      { 200: { kind: "json", schema: schemas.ExternalEngine } },
    );
  }

  /**
   * Analyse with external engine
   */
  async apiExternalEngineAnalyse(
    params: { id: string } & {
      body: {
        clientSecret: string;
        work: schemas.ExternalEngineWork;
      };
    },
  ) {
    const path = `/api/external-engine/${params.id}/analyse`;
    const baseUrl = "https://engine.lichess.ovh";
    return await this.requestor.post(
      { path, body: params.body, baseUrl },
      {
        200: {
          kind: "ndjson",
          schema: z.object({
            time: z.int().check(z.minimum(0)),
            depth: z.int().check(z.minimum(0)),
            nodes: z.int().check(z.minimum(0)),
            pvs: z.array(
              z.object({
                depth: z.int().check(z.minimum(0)),
                cp: z.optional(z.int()),
                mate: z.optional(z.int()),
                moves: z.array(z.string()),
              }),
            ),
          }),
        },
      },
    );
  }

  /**
   * Acquire analysis request
   */
  async apiExternalEngineAcquire(params: { body: { providerSecret: string } }) {
    const path = "/api/external-engine/work";
    const baseUrl = "https://engine.lichess.ovh";
    return await this.requestor.post(
      { path, body: params.body, baseUrl },
      {
        200: {
          kind: "json",
          schema: z.object({
            id: z.string(),
            work: schemas.ExternalEngineWork,
            engine: schemas.ExternalEngine,
          }),
        },
        204: { kind: "nocontent" },
      },
    );
  }

  /**
   * Answer analysis request
   */
  async apiExternalEngineSubmit(params: { id: string } & { body: string }) {
    const path = `/api/external-engine/work/${params.id}`;
    const baseUrl = "https://engine.lichess.ovh";
    return await this.requestor.post(
      { path, body: params.body, baseUrl },
      { 200: { kind: "nocontent" } },
    );
  }

  /**
   * Request authorization code
   */
  async oauth(params: {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    code_challenge_method: string;
    code_challenge: string;
    scope?: string;
    username?: string;
    state?: string;
  }) {
    const path = "/oauth";
    return await this.requestor.get(
      { path, query: params },
      { 200: { kind: "nocontent" } },
    );
  }

  /**
   * Obtain access token
   */
  async apiToken(params: {
    body: {
      grant_type?: string;
      code?: string;
      code_verifier?: string;
      redirect_uri?: string;
      client_id?: string;
    };
  }) {
    const path = "/api/token";
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: {
          kind: "json",
          schema: z.object({
            token_type: z.string(),
            access_token: z.string(),
            expires_in: z.int(),
          }),
        },
        400: { kind: "json", schema: schemas.OAuthError },
      },
    );
  }

  /**
   * Revoke access token
   */
  async apiTokenDelete() {
    const path = "/api/token";
    return await this.requestor.delete(
      { path },
      { 204: { kind: "nocontent" } },
    );
  }

  /**
   * Test multiple OAuth tokens
   */
  async tokenTest(params: { body: string }) {
    const path = "/api/token/test";
    return await this.requestor.post(
      { path, body: params.body },
      {
        200: {
          kind: "json",
          schema: z.record(
            z.string(),
            z.union([
              z.object({
                userId: z.optional(z.string()),
                scopes: z.optional(z.string()),
                expires: z.optional(z.nullable(z.int())),
              }),
              z.null(),
            ]),
          ),
        },
      },
    );
  }

  /**
   * Masters database
   */
  async openingExplorerMaster(params: {
    fen?: string;
    play?: string;
    since?: number;
    until?: number;
    moves?: number;
    topGames?: number;
  }) {
    const path = "/masters";
    const baseUrl = "https://explorer.lichess.org";
    return await this.requestor.get(
      { path, query: params, baseUrl },
      { 200: { kind: "json", schema: schemas.OpeningExplorerMasters } },
    );
  }

  /**
   * Lichess games
   */
  async openingExplorerLichess(params: {
    variant?: schemas.VariantKey;
    fen?: string;
    play?: string;
    speeds?: schemas.Speed[];
    ratings?: (0 | 1000 | 1200 | 1400 | 1600 | 1800 | 2000 | 2200 | 2500)[];
    since?: string;
    until?: string;
    moves?: number;
    topGames?: number;
    recentGames?: number;
    history?: boolean;
  }) {
    const path = "/lichess";
    const baseUrl = "https://explorer.lichess.org";
    return await this.requestor.get(
      { path, query: params, baseUrl },
      { 200: { kind: "json", schema: schemas.OpeningExplorerLichess } },
    );
  }

  /**
   * Player games
   */
  async openingExplorerPlayer(params: {
    player: string;
    color: "white" | "black";
    variant?: schemas.VariantKey;
    fen?: string;
    play?: string;
    speeds?: schemas.Speed[];
    modes?: ("casual" | "rated")[];
    since?: string;
    until?: string;
    moves?: number;
    recentGames?: number;
  }) {
    const path = "/player";
    const baseUrl = "https://explorer.lichess.org";
    return await this.requestor.get(
      { path, query: params, baseUrl },
      { 200: { kind: "ndjson", schema: schemas.OpeningExplorerPlayer } },
    );
  }

  /**
   * OTB master game
   */
  async openingExplorerMasterGame(params: { gameId: string }) {
    const path = `/masters/pgn/${params.gameId}`;
    const baseUrl = "https://explorer.lichess.org";
    return await this.requestor.get(
      { path, baseUrl },
      { 200: { kind: "chess-pgn" } },
    );
  }

  /**
   * Tablebase lookup
   */
  async tablebaseStandard(params: {
    fen: string;
    dtc?: "never" | "auxiliary" | "always";
  }) {
    const path = "/standard";
    const baseUrl = "https://tablebase.lichess.org";
    return await this.requestor.get(
      { path, query: params, baseUrl },
      { 200: { kind: "json", schema: schemas.TablebaseJson } },
    );
  }

  /**
   * Tablebase lookup for Atomic chess
   */
  async tablebaseAtomic(params: { fen: string }) {
    const path = "/atomic";
    const baseUrl = "https://tablebase.lichess.org";
    return await this.requestor.get(
      { path, query: params, baseUrl },
      { 200: { kind: "json", schema: schemas.TablebaseJson } },
    );
  }

  /**
   * Tablebase lookup for Antichess
   */
  async antichessAtomic(params: { fen: string }) {
    const path = "/antichess";
    const baseUrl = "https://tablebase.lichess.org";
    return await this.requestor.get(
      { path, query: params, baseUrl },
      { 200: { kind: "json", schema: schemas.TablebaseJson } },
    );
  }
}
