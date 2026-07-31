"use client";

import { ACTIVITIES, ActivityKey, GRID_COLS, GRID_ROWS, STATIONS } from "@/lib/activities";
import { ROOM_HEIGHT, ROTATE_X, ROTATE_Z, TILE, worldPos } from "@/lib/iso";
import { useCharacterMotion } from "@/lib/useCharacterMotion";
import { useStageScale } from "@/lib/useStageScale";
import { Bookshelf, Couch, Desk, ReviewTable, ServerRack } from "./Furniture";
import { IsoBox } from "./IsoBox";
import { Character } from "./Character";
import { SpeechBubble } from "./SpeechBubble";

const STAGE_WIDTH = 980;
const STAGE_HEIGHT = 620;

export interface IsoRoomProps {
  activity: ActivityKey;
  label: string;
}

export function IsoRoom({ activity, label }: IsoRoomProps) {
  const { ref, scale } = useStageScale(STAGE_WIDTH);
  const config = ACTIVITIES[activity];
  const station = STATIONS[config.station];

  const motion = useCharacterMotion(
    { x: station.standGx, y: station.standGy },
    { x: STATIONS.couch.standGx, y: STATIONS.couch.standGy }
  );

  const floorW = GRID_COLS * TILE;
  const floorD = GRID_ROWS * TILE;

  return (
    <div
      ref={ref}
      className="mx-auto"
      style={{
        width: STAGE_WIDTH * scale,
        height: STAGE_HEIGHT * scale,
      }}
    >
      <div
        style={{
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          perspective: 1600,
          perspectiveOrigin: "50% 22%",
        }}
      >
        <div
          className="relative"
          style={{
            position: "absolute",
            left: (STAGE_WIDTH - floorW) / 2,
            top: STAGE_HEIGHT * 0.14,
            width: floorW,
            height: floorD,
            transformStyle: "preserve-3d",
            transform: `translateZ(-40px) rotateX(${ROTATE_X}deg) rotateZ(${ROTATE_Z}deg)`,
          }}
        >
          {/* floor */}
          <div
            className="absolute rounded-md shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
            style={{
              width: floorW,
              height: floorD,
              backgroundColor: "#eef1f6",
              backgroundImage:
                "repeating-conic-gradient(#eef1f6 0% 25%, #e6eaf2 0% 50%)",
              backgroundSize: `${TILE}px ${TILE}px`,
              transform: "translateZ(0px)",
            }}
          />

          {/* back wall (north edge) */}
          <IsoBox
            gx={-0.06}
            gy={-0.1}
            w={GRID_COLS + 0.12}
            d={0.1}
            h={ROOM_HEIGHT}
            topColor="#c9d2e0"
            eastColor="#aab4c6"
            southColor="linear-gradient(180deg,#dbe3f0 0%, #cdd7e8 70%, #c3cee0 100%)"
          />
          {/* west wall */}
          <IsoBox
            gx={-0.1}
            gy={-0.06}
            w={0.1}
            d={GRID_ROWS + 0.12}
            h={ROOM_HEIGHT}
            topColor="#c9d2e0"
            eastColor="linear-gradient(180deg,#cfd8e8 0%, #c1cbe0 70%, #b6c1d8 100%)"
            southColor="#aab4c6"
          />

          {/* window decal on back wall, built as a thin IsoBox so its
              face transforms reuse the already-verified box math */}
          <IsoBox
            gx={2.05}
            gy={-0.09}
            w={1.6}
            d={0.02}
            h={92}
            z={70}
            topColor="#eaf6ff"
            eastColor="#dbe9f7"
            southColor="linear-gradient(180deg,#cdeaff 0%,#eef8ff 55%,#ffffff 55% 60%,#eef8ff 60% 100%), linear-gradient(90deg,#cdeaff 0%,#eef8ff 47%,#ffffff 47% 53%,#eef8ff 53% 100%)"
            radius={4}
          />

          <Desk active={activity === "building"} />
          <Bookshelf active={activity === "researching"} />
          <ReviewTable active={activity === "reviewing" || activity === "chatting"} />
          <ServerRack active={activity === "deploying"} />
          <Couch active={activity === "idle"} />

          {/* character (billboarded so it always faces the camera) */}
          <div
            className="absolute"
            style={{
              transform: worldPos(motion.x, motion.y, 0),
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute"
              style={{
                transform: `rotateZ(${-ROTATE_Z}deg) rotateX(${-ROTATE_X}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: -44,
                  top: -128,
                  width: 88,
                }}
              >
                <SpeechBubble label={label} icon={config.bubbleIcon} accent={config.accent} />
                <Character
                  activity={activity}
                  isMoving={motion.isMoving}
                  facingLeft={motion.facingLeft}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
