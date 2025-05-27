---
title: BT's CombatLogger - Introduction
---

# BT's CombatLogger ⚔️

<p align="center">
    <a href="https://discord.pluginz.dev">
        <img src="https://i.imgur.com/JgDt1Fl.png" width="300" alt="Discord Invite">
    </a>
    <br>
    <i>Please join the Discord if you have questions!</i>
  <br>
  <i>Developed by TubYoub & BrassCrafter</i>
</p>

BT's CombatLogger is a Spigot/Paper plugin designed to discourage and punish players who log out ("combat log") while engaged in PvP combat. When a player involved in recent combat disconnects, the plugin can be configured to kill them, ensuring fairness and preventing players from escaping unfavorable fights by simply leaving the server.

::: tip The Problem Solved
Combat logging is a common frustration in PvP-enabled Minecraft servers. This plugin provides a straightforward solution to penalize this behavior.
:::

## Core Features

*   **Combat Tagging:** Automatically tags players as "in combat" when they deal or receive damage from another player (excluding allies).
*   **Configurable Combat Timer:** Set how long a player remains tagged after the last combat action.
*   **Quit Punishment:** Players who log out while tagged as "in combat" are automatically killed upon their next login or immediately if possible.
*   **Ally System:** Players can form alliances (`/cl ally add <player>`) so that friendly fire between allies does not trigger the combat timer.
*   **Admin Commands:**
    *   Manually start or stop combat tags for players.
    *   List players currently in combat.
    *   Adjust the combat timer duration.
    *   Reload plugin configuration.
*   **Action Bar Notifications:** Players are notified via the action bar when they enter combat and how much time remains on their combat timer.
*   **Lightweight:** Designed to be efficient and have minimal impact on server performance.
*   **Update Checker:** Notifies admins of new plugin versions.

Ready to bring fair play to your server's PvP? Head to the [Installation Guide](./installation.md).
