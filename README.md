#### ⚠️ Do not download modules from 3rd party sources like random websites you found on Google. Only use this repository. I am not responsible for anything they may contain.

# RVX Module Builder

[![CI](https://github.com/yadavnikhil03/rvx-next/actions/workflows/ci.yml/badge.svg?event=schedule)](https://github.com/yadavnikhil03/rvx-next/actions/workflows/ci.yml)

Get the [latest CI release](https://github.com/yadavnikhil03/rvx-next/releases/latest).

## Features
* Updated with the latest versions of patches.
* Cleans APKs from unneeded libs to make them smaller.
* Fully open-source, every binary or APK is compiled without human intervention.
* Modules:
  * Recompile invalidated odex for video and music apps for faster usage.
  * Receive updates from Magisk app.
  * Should not break safetynet or trigger root detections used by certain apps.
  * Handle installation of the correct version of the stock app automatically.
  * Support Magisk and KernelSU.

## Notes
* Use [zygisk-detach](https://github.com/j-hc/zygisk-detach) to block the Play Store from automatically updating your patched apps.
* Non-root versions require [MicroG](https://github.com/MorpheApp/MicroG-RE) to work. 
*(Both of these are included in this repository's Releases!)*

## Credits
* [j-hc](https://github.com/j-hc) for [zygisk-detach](https://github.com/j-hc/zygisk-detach) and the core scripts.
* [ReVanced Team](https://github.com/revanced) for their [patches](https://github.com/revanced/revanced-patches).
* [NoName-exe](https://github.com/NoName-exe) for his contributions.
* [Morphe Team](https://github.com/MorpheApp) for [MicroG](https://github.com/MorpheApp/MicroG-RE).
* [Gnad Gnaoh](https://github.com/gnadgnaoh) for figuring out important fixes.
