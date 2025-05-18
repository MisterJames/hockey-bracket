<template>
  <svg :width="svgWidth" :height="svgHeight" xmlns="http://www.w3.org/2000/svg">

    <defs>
      <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#999" flood-opacity="0.4" />
      </filter>
    </defs>

    <!-- Round 1 West -->
    <g v-for="(match, index) in bracket.matchups?.west?.[0] ?? []" :key="'w1-' + match.id">
      <MatchupSvg :x="startX" :y="index * matchSpacingY" :width="boxWidth" :height="boxHeight" :match="match"
        :round="0" />
      <LineConnector v-if="bracket.matchups?.west?.[1]?.[Math.floor(index / 2)]"
        :from="{ x: startX + boxWidth, y: index * matchSpacingY + boxHeight / 2 }"
        :to="{ x: startX + roundSpacing, y: Math.floor(index / 2) * matchSpacingY * 2 + matchSpacingY / 2 + boxHeight / 2 }" />
    </g>

    <!-- Round 2 West -->
    <g v-for="(match, index) in bracket.matchups?.west?.[1] ?? []" :key="'w2-' + match.id">
      <MatchupSvg :x="startX + roundSpacing" :y="index * matchSpacingY * 2 + matchSpacingY / 2" :width="boxWidth"
        :height="boxHeight" :match="match" :round="1" />
      <LineConnector v-if="bracket.matchups?.west?.[2]?.[Math.floor(index / 2)]"
        :from="{ x: startX + roundSpacing + boxWidth, y: index * matchSpacingY * 2 + matchSpacingY / 2 + boxHeight / 2 }"
        :to="{ x: startX + roundSpacing * 2, y: Math.floor(index / 2) * matchSpacingY * 4 + matchSpacingY + boxHeight }" />
    </g>

    <!-- Round 3 West -->
    <g v-for="(match, index) in bracket.matchups?.west?.[2] ?? []" :key="'w3-' + match.id">
      <MatchupSvg :x="startX + roundSpacing * 2" :y="index * matchSpacingY * 4 + matchSpacingY * 1.5" :width="boxWidth"
        :height="boxHeight" :match="match" :round="2" />
      <LineConnector v-if="bracket.matchups?.final"
        :from="{ x: startX + roundSpacing * 2 + boxWidth, y: index * matchSpacingY * 4 + matchSpacingY + boxHeight / 2 }"
        :to="{ x: startX + roundSpacing * 3, y: svgHeight / 2 }" />
    </g>

    <!-- Final -->
    <g v-if="bracket.matchups?.final">
      <MatchupSvg :x="startX + roundSpacing * 3" :y="svgHeight / 2 - boxHeight / 2" :width="boxWidth"
        :height="boxHeight" :match="bracket.matchups.final" :round="3" />
    </g>

    <!-- Round 3 East -->
    <g v-for="(match, index) in bracket.matchups?.east?.[2] ?? []" :key="'e3-' + match.id">
      <MatchupSvg :x="startX + roundSpacing * 4" :y="index * matchSpacingY * 4 + matchSpacingY * 1.5" :width="boxWidth"
        :height="boxHeight" :match="match" :round="2" />
      <LineConnector v-if="bracket.matchups?.final"
        :from="{ x: startX + roundSpacing * 4, y: index * matchSpacingY * 4 + matchSpacingY + boxHeight / 2 }"
        :to="{ x: startX + roundSpacing * 3 + boxWidth, y: svgHeight / 2 }" />
    </g>

    <!-- Round 2 East -->
    <g v-for="(match, index) in bracket.matchups?.east?.[1] ?? []" :key="'e2-' + match.id">
      <MatchupSvg :x="startX + roundSpacing * 5" :y="index * matchSpacingY * 2 + matchSpacingY / 2" :width="boxWidth"
        :height="boxHeight" :match="match" :round="1" />
      <LineConnector v-if="bracket.matchups?.east?.[2]?.[Math.floor(index / 2)]" :to="{
        x: startX + roundSpacing * 5,
        y: index * matchSpacingY * 2 + matchSpacingY / 2 + boxHeight / 2
      }" :from="{
              x: startX + roundSpacing * 4 + boxWidth,
              y: Math.floor(index / 2) * matchSpacingY * 4 + matchSpacingY + boxHeight
            }" />
    </g>

    <!-- Round 1 East -->
    <g v-for="(match, index) in bracket.matchups?.east?.[0] ?? []" :key="'e1-' + match.id">
      <MatchupSvg :x="startX + roundSpacing * 6" :y="index * matchSpacingY" :width="boxWidth" :height="boxHeight"
        :match="match" :round="0" />
      <LineConnector v-if="bracket.matchups?.east?.[1]?.[Math.floor(index / 2)]"
        :to="{ x: startX + roundSpacing * 6, y: index * matchSpacingY + boxHeight / 2 }"
        :from="{ x: startX + roundSpacing * 5 + boxWidth, y: Math.floor(index / 2) * matchSpacingY * 2 + matchSpacingY / 2 + boxHeight / 2 }" />
    </g>
  </svg>
</template>

<script setup>
import { useBracketStore } from '@/store/bracketStore'
import MatchupSvg from '@/svg/MatchupSvg.vue'
import LineConnector from '@/svg/LineConnector.vue'

const bracket = useBracketStore()

const boxWidth = 90
const boxHeight = 75
const matchSpacingY = 100
const roundSpacing = 135
const startX = 20

const svgWidth = startX + roundSpacing * 7
const svgHeight = 400
</script>