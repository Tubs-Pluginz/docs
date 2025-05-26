# Core Mechanics Explained 🧠

Understanding how BT's CombatLogger functions internally will help you utilize it effectively on your server.

## 1. Combat Tagging System 🎯

*   **Trigger:** A player is tagged as "in combat" when:
    *   They damage another player (who is not an ally).
    *   They are damaged by another player (who is not an ally).
    *   This includes damage from projectiles (like arrows) shot by players.
*   **Self-Harm/Environment:** Damaging oneself or taking damage from the environment (e.g., fall damage, mobs, lava) does **not** trigger the combat tag from this plugin.
*   **Ally Exemption:** If two players are registered as allies via the `/cl ally` system, hitting each other will **not** trigger the combat tag for either player.
*   **Timer Initiation/Refresh:**
    *   When a combat action occurs, both involved (non-allied) players are tagged.
    *   If a player is already tagged, any new valid combat action will **reset** their combat timer to the full duration specified by `combatTimeout` in `config.yml`.
*   **Action Bar Notification:** Players who are tagged in combat will see a message on their action bar indicating they are in combat and showing the remaining seconds on their timer (e.g., "You are in combat for 25s"). When the timer expires, they receive a message like "You are no longer in combat."

## 2. Combat Timer (`CombatTimer.java`) ⏱️

*   Each player tagged in combat has an individual timer instance.
*   The duration of this timer is determined by the `combatTimeout` value in `config.yml`.
*   The timer counts down every second.
*   If a player engages in further combat (deals or receives damage from a non-ally) while their timer is active, the timer is reset to the full `combatTimeout` duration.
*   When the timer reaches zero, the player is no longer considered "in combat" by the plugin, and the action bar message updates accordingly.

## 3. Quit Punishment (`QuitListener.java`) 💀

*   **Trigger:** A player disconnects (logs out) from the server.
*   **Check:** The plugin checks if this disconnecting player is currently tagged as "in combat" (i.e., their combat timer is still active).
*   **Punishment:** If the player *is* tagged in combat when they disconnect:
    *   Their health is set to 0, effectively killing them. This means upon their next login, they will respawn as if they died.
    *   Their combat tag is removed.
    *   The plugin internally notes that this player "left in combat."
*   **Rejoin Message:** When a player who was killed for combat logging rejoins the server, they receive an action bar message: "You were killed because you left while in combat." (This message is from `CombatManager.judgePlayerQuit`).
*   **Death Message:** The death message for a combat logger is customized to indicate they "died because he left during combat" (from `DeathListener.java`).

## 4. Ally System (`AllyManager.java`) 🤝

*   **Purpose:** Allows players to form alliances to prevent accidental combat tagging during friendly fights or team activities.
*   **Requests:**
    *   A player (`PlayerA`) can send an ally request to another player (`PlayerB`) using `/cl ally add <PlayerB>`.
    *   `PlayerB` receives a clickable message with "[Accept]" and "[Deny]" options.
    *   Ally requests are timed and expire after 30 seconds if not acted upon.
*   **Accepting/Denying:**
    *   If `PlayerB` clicks "[Accept]" (or uses `/cl ally accept <PlayerA>`), the alliance is formed.
    *   If `PlayerB` clicks "[Deny]" (or uses `/cl ally deny <PlayerA>`), the request is denied.
*   **Mutual Alliance:** Alliances are mutual. If A is allied with B, B is also allied with A.
*   **Removing Allies:** Players can remove an ally using `/cl ally remove <Player>`. This removes the alliance for both players.
*   **Persistence:** Ally relationships are stored in `plugins/CombatLogger/allies.yml` and are loaded when the server starts or when the plugin is reloaded. This file stores pairs of player UUIDs.
*   **Impact:** When two players who are allies hit each other, the `HitListener` checks their ally status and does **not** tag them for combat.

## 5. Configuration & Data Management

*   **`config.yml`:** Stores primary settings like `combatTimeout` and `checkVersion`. Managed by `ConfigManager.java`. Can be reloaded with `/cl reload`.
*   **`allies.yml`:** Stores persistent ally relationships (pairs of UUIDs). Managed by `AllyManager.java`. Reloaded with `/cl reload`.
*   **In-Memory Data:**
    *   `CombatManager` keeps track of currently tagged players and their active `CombatTimer` instances.
    *   `AllyManager` caches ally requests in memory.

This system ensures that players are penalized for leaving during active PvP, while also providing flexibility through the ally system and administrative controls.
