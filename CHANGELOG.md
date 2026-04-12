# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Camera working.
- Projects app.

## [0.2.0] - 2026-04-12

- Sprite-based home screen: `about_me`, `empty`, `selected`, `info_bubble`, `background`, `scrollbar`.
- Fixed-center selection frame; the app row slides under it. 15 slots (5 apps + 10 empty).
- Keyboard-only navigation (mouse select + bounce animation removed).
- Device render scale 3× → 2×. Top screen no longer clipped.

## [0.1.0] - 2026-04-11

- Initial Vite + React + TypeScript + Vitest scaffold.
- DSi-styled home screen V1 with CSS tiles: two stacked 256×192 screens, live clock, arrow-key selection, 5 apps.
