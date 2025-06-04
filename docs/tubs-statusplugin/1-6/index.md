---
title: Tub's Status Plugin - Introduction
---

# Tub's Status Plugin 💬

<p align="center">
    <a href="https://discord.pluginz.dev">
        <img src="https://i.imgur.com/JgDt1Fl.png" width="300" alt="Discord Invite">
    </a>
    <br>
    <i>Please join the Discord if you have questions!</i>
  <br>
  <i>Developed by TubYoub</i>
</p>

Tub's Status Plugin is a Minecraft plugin for Spigot/Paper servers that empowers players to express themselves by setting custom statuses. These statuses are visibly displayed in the tab list and above their heads in-game, adding a personal touch to your server community.

::: tip Personalize Your Presence!
Let players share their mood, current activity, or a fun message with everyone on the server.
:::

## Core Features

*   **Custom Player Statuses:** Players can set their own unique status messages using `/status <message>`.
*   **Formatting Support:** Allows usage of Minecraft color codes (`&0-&f`) and formatting codes (`&k-&o`, `&r`) in statuses, controlled by permissions.
*   **Tab List Display:** Player statuses are integrated into the tab list (if enabled).
*   **Chat Formatter:** Player statuses can be shown in chat messages (if enabled).
*   **Admin Controls (primarily via `/tsp` command):**
    *   Set or remove other players' statuses.
    *   Reload plugin configuration and statuses.
    *   Set and reset maximum status length.
    *   View plugin information and help.
*   **Persistence:** Statuses are saved and persist across server restarts and player relogs.
*   **PlaceholderAPI Integration:**
    *   Provides placeholders for use in other plugins (e.g., `%tubsstatusplugin_status%`).
    *   Allows use of other PAPI placeholders within status messages.
*   **LuckPerms Integration:** Can display LuckPerms prefixes and suffixes within the status format using `%LP_prefix%` and `%LP_suffix%`.
*   **Group Mode:** Optionally restrict players to choosing statuses from predefined groups, with fine-grained permission control for each group.
*   **Configurable:** Control maximum status length, chat/tab list formatting, status wrapping characters, logging level, and more.
*   **Update Checker:** Notifies admins of new plugin versions.

Get started by following the [Installation Guide](./installation.md).