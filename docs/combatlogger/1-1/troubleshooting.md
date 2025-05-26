# Troubleshooting Guide 🛠️

If BT's CombatLogger isn't behaving as expected, these steps can help you identify and fix the issue.

## 1. Initial Checks ✅

*   **Latest Plugin Version:** Are you using the most recent version of BT's CombatLogger? Check [Modrinth](https://modrinth.com/plugin/bts-combatlogger) <!-- Replace with actual link --> or GitHub Releases.
*   **Server Version:** The plugin is built for API 1.13+ (compatible up to 1.20 as per README). Ensure your server version (Spigot, Paper, etc.) falls within this range.
*   **Java Version:** The `pom.xml` indicates Java 8. Ensure your server is running on Java 8 or a compatible newer version.
*   **Console Logs:** This is your primary diagnostic tool. Check your server's console (`logs/latest.log`) for any errors or warnings prefixed with `[BTCL]` or `CombatLogger` during startup or when the issue occurs.
*   **`config.yml` Review:** Carefully check `plugins/CombatLogger/config.yml` for correct values and YAML syntax.
*   **`allies.yml` (If ally issues):** Check `plugins/CombatLogger/allies.yml` for correct formatting (pairs of UUIDs per line).

## 2. Common Issues & Solutions

### A. Players Not Being Tagged in Combat

::: details Symptoms & Checklist
**Symptoms:**
*   Players hit each other, but no action bar message appears, and they aren't killed if they log out.
*   `/cl list` shows no one in combat.

**Checklist:**
1.  **Plugin Enabled:** Is BT's CombatLogger listed and enabled in `/plugins`?
2.  **Listener Registration:** Check startup logs for any errors related to registering event listeners (e.g., `HitListener`).
3.  **Ally Status:** Are the players involved perhaps allies? Use `/cl ally` commands to check or try with players you know are not allied. Remember, hitting an ally does *not* trigger combat.
4.  **Damage Type:** Is the damage definitely Player-vs-Player? Environmental damage (mobs, fall, lava) does not tag.
5.  **Plugin Conflict (Event Handling):**
    *   Do you have other plugins that manage combat, PvP, or damage events with high priority? Another plugin might be cancelling the damage event before BT's CombatLogger can process it, or modifying it in a way that prevents tagging.
    *   Try temporarily removing other combat-related or anti-cheat plugins to see if tagging starts working. If it does, you'll need to investigate which plugin is conflicting and see if its event priorities or configurations can be adjusted.
6.  **World/Region Protection:** Some protection plugins (WorldGuard, etc.) might have flags that prevent PvP or certain types of entity interaction in specific regions. Ensure PvP is allowed where you are testing.
:::

### B. Players Not Punished for Combat Logging

::: details Symptoms & Checklist
**Symptoms:**
*   A player is tagged in combat (action bar shows timer), they log out, but they are not killed and don't receive the "killed for combat logging" message on rejoin.

**Checklist:**
1.  **Combat Tag Active at Logout:** Was the player *definitely* still tagged when they logged out? The action bar timer must have been active.
2.  **`QuitListener` Functioning:** Check startup logs for errors registering `QuitListener`.
3.  **Server Shutdown vs. Player Quit:** If the *entire server* shuts down or crashes while a player is combat-tagged, the plugin might not have a chance to process their "quit" and apply the penalty. The penalty is typically applied when the `PlayerQuitEvent` is fired.
4.  **Other Plugins Modifying Quit/Death:** Could another plugin be interfering with the death process or player data on quit/join in a way that negates the penalty?
5.  **Console Errors on Quit/Join:** Check console logs when the combat-tagged player quits and when they rejoin for any errors from BT's CombatLogger.
:::

### C. Ally System Not Working Correctly

::: details Symptoms & Checklist
**Symptoms:**
*   Ally requests are not received or cannot be accepted/denied.
*   Allied players are still tagging each other in combat.
*   `/cl ally` commands give unexpected errors.

**Checklist:**
1.  **Permissions:** Does the player using `/cl ally` have the `combatlogger.ally` permission? (Default is `true` for all players).
2.  **Correct Player Names:** Are player names being typed correctly (case-sensitive usually matters for Bukkit's `getPlayerExact`)? Is the target player online?
3.  **`allies.yml`:**
    *   Check `plugins/CombatLogger/allies.yml` for its existence and proper formatting (each line should be `UUID1,UUID2`).
    *   File permissions: Can the server process write to this file?
4.  **Console Errors:** Look for errors related to `AllyManager` or file I/O when ally commands are used or when the plugin loads/reloads.
5.  **Request Timeout:** Ally requests expire after 30 seconds. Ensure the target player is accepting within this window.
:::

### D. `/cl settime` Not Working or Value Not Persisting

::: details Symptoms & Checklist
**Symptoms:**
*   `/cl settime <seconds>` reports success, but the combat timer duration doesn't actually change for new combat instances, or it reverts after a reload/restart.

**Checklist:**
1.  **Permissions:** Does the user have `combatlogger.settimer`?
2.  **Saving to `config.yml`:**
    *   The `ConfigManager.setCombatTimeout()` method attempts to save the new value to `config.yml`. Check if `plugins/CombatLogger/config.yml` is actually being updated after using the command.
    *   Are there any file permission issues preventing the plugin from writing to `config.yml`?
    *   Check console for errors related to "Error while saving the configuration" when using the command or on plugin disable.
3.  **Reload vs. Restart:** After setting the time, new combat instances should use the new time. If it reverts after a full server restart, it means the value didn't save to `config.yml` correctly.
:::

### E. Plugin Not Loading / Errors on Startup

::: details Symptoms & Checklist
**Symptoms:**
*   BT's CombatLogger doesn't appear in `/plugins`.
*   Errors related to `dev.pluginz.combatlogger` in the console during server startup.

**Checklist:**
1.  **Java Version:** The `pom.xml` specifies Java 1.8. Ensure your server is running Java 8 or a compatible newer version.
2.  **Spigot/Paper API Version:** The `plugin.yml` states `api-version: 1.13`. Ensure your server software (Spigot, Paper, etc.) is 1.13 or newer.
3.  **Corrupted JAR:** The downloaded plugin JAR might be corrupted. Try re-downloading it.
4.  **Dependencies:** BT's CombatLogger shades BoostedYAML and Jackson. While this minimizes conflicts, ensure no other plugin is causing extreme classpath issues (very rare).
5.  **`config.yml` Syntax (Severe):** A completely broken `config.yml` could prevent loading. If suspected, back it up, delete it, and let the plugin regenerate a default one.
:::

## 4. Providing Information for Support 🆘

If you're unable to resolve the issue with these steps, please seek help on our [Community Discord Server](https://discord.pluginz.dev).

To help us assist you, please provide:

*   **BT's CombatLogger Version:** (e.g., `1.1-beta`)
*   **Server Software & Version:** (e.g., Paper 1.16.5, Spigot 1.19.4)
*   **Java Version:** 
*   **Your `config.yml` for BT's CombatLogger.**
*   **(If relevant) Your `allies.yml` file.**
*   **Detailed Console Logs:** Copy relevant sections from your server console (e.g., `logs/latest.log`) from startup through when the issue occurs. Use a service like [Pastebin](https://pastebin.com), [Hastebin](https://hastebin.com/), or [mclo.gs](https://mclo.gs/). **Do not paste long logs directly into Discord.**
*   **A Clear Description of the Issue:** What did you expect? What happened? Any specific error messages?
*   **Steps to Reproduce:** If you can reliably trigger the issue, list the steps.

The more information you provide, the better we can help!
