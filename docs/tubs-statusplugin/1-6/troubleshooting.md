# Troubleshooting Guide 🛠️

Experiencing issues with Tub's Status Plugin? This guide will help you diagnose and resolve them.

## 1. Initial Checks ✅

*   **Latest Plugin Version:** Ensure you're using the most recent version of Tub's Status Plugin from [Modrinth](https://modrinth.com/plugin/tubs-status-plugin).
*   **Server Version:** The plugin targets API 1.13+ (compatible up to 1.21+). Verify your server (Spigot, Paper, etc.) is within this range.
*   **Java Version:** The plugin is built with Java 14, targeting Java 8 runtime. Ensure your server runs Java 8 or a compatible newer version.
*   **Console Logs:** Your primary tool! Check `logs/latest.log` for errors or warnings from `[TSP]` or `TubsStatusPlugin` during startup or when the issue occurs.
    *   Set `loggerLevel: 10` (DEBUG) in `config.yml` for maximum detail during troubleshooting.
*   **`config.yml`:** Review `plugins/TubsStatusPlugin/config.yml` for typos, correct values, and valid YAML syntax (use an online YAML validator).
*   **Dependencies:**
    *   If using PlaceholderAPI features, is PlaceholderAPI installed, enabled, and up-to-date?
    *   If using LuckPerms prefix/suffix features, is LuckPerms installed, enabled, and up-to-date?

## 2. Common Issues & Solutions

### A. Status Not Setting or Displaying

::: details Symptoms & Checklist
**Symptoms:**
*   `/status <message>` or `/status <groupname>` command seems to work (no error), but the status doesn't appear in tab, above head, or in chat.
*   Status appears in some places but not others.

**Checklist:**
1.  **Permissions:**
    *   Does the player have `StatusPlugin.setStatus` (for custom status) or `StatusPlugin.group.set` (for group status)?
    *   If using color/formatting codes, do they have the relevant `StatusPlugin.formatting.<type>` permissions (e.g., `StatusPlugin.formatting.color`)? By default, these are OP-only.
    *   For group statuses, check specific group permissions as outlined in the [Configuration Guide](./configuration.md#statusgroups).
2.  **`config.yml` Settings:**
    *   Is `changeTablistNames: true` if you expect it in the tab list?
    *   Is `chatFormatter: true` if you expect it in chat?
3.  **`maxStatusLength`:** Is the *visible* part of the status (after removing color codes/placeholders) within the configured `maxStatusLength`?
4.  **Spaces in Status:** If your status needs spaces, did you use `&_` in the command? E.g., `/status Hello&_World`. Regular spaces might be trimmed.
5.  **Plugin Conflicts (Display):**
    *   Do you have other plugins that manage tab list formatting, player display names, or chat formatting with high priority? They might be overriding Tub's Status Plugin.
    *   Try temporarily removing other such plugins to test.
6.  **Console Errors:** Check for any errors when the status is set or when a player joins/chats.
7.  **PlaceholderAPI/LuckPerms Hooks:**
    *   If using PAPI/LP placeholders in status: Are PAPI/LP installed and working? Does the player have `StatusPlugin.placeholders` permission?
    *   Check startup logs to see if Tub's Status Plugin successfully hooked into PAPI/LP ("Tub's StatusPlugin will now use PlaceholderAPI", "Tub's StatusPlugin will now hook into LuckPerms").
:::

### B. Group Mode Issues

::: details Symptoms & Checklist
**Symptoms:**
*   Players can still set custom statuses with `/status <message>` even if `groupMode: true`. (Admins with `StatusPlugin.admin.setStatus` can always do this).
*   `/status <groupname>` command doesn't work or says "Invalid group name."
*   Players can't use a specific group status.

**Checklist:**
1.  **`groupMode: true`:** Is this correctly set in `config.yml` and the plugin reloaded (`/tsp reload`) or server restarted?
2.  **`statusGroups` Definition (`config.yml`):**
    *   Are your groups defined correctly under `statusGroups:` with a `status:` sub-key?
    *   Is the `<groupname>` used in the command an exact match (case-sensitive) to a key in `statusGroups`?
3.  **Permissions for Groups:**
    *   Does the player have the base `StatusPlugin.group.set` permission (default: true)?
    *   For the specific group:
        *   If the group has a non-empty `permissions` list in `config.yml`, does the player have **one** of those permissions?
        *   If the group's `permissions` list is empty or absent, `StatusPlugin.group.set` is generally sufficient.
    *   Refer to the detailed permission logic in the [Configuration Guide](./configuration.md#statusgroups).
4.  **Admin Commands:** Remember admins can bypass player-facing group mode restrictions.
    *   `/tsp setstatus <player> <custom_message>` will set a custom status.
    *   `/tsp setstatus <player> <groupname>` or `/status <player> <groupname>` will set a group status for another player.
:::

### C. PlaceholderAPI Placeholders Not Working

::: details Symptoms & Checklist
**Symptoms:**
*   Placeholders like `%tubsstatusplugin_status%` show as raw text.
*   Placeholders used *within* a status (e.g., `%player_name%`) are not parsed.

**Checklist:**
1.  **PlaceholderAPI Installed & Enabled:** Is PAPI actually on your server and running? Check `/plugins`.
2.  **Expansion Registered:** Did Tub's Status Plugin successfully register its expansion? Check startup logs for "Tub's StatusPlugin will now use PlaceholderAPI". Run `/papi info tubsstatusplugin` (or similar, check PAPI docs for listing expansions).
3.  **Correct Placeholder Syntax:**
    *   For placeholders *provided by this plugin*: `%tubsstatusplugin_status%` or `%tubsstatusplugin_status_PlayerName%`.
    *   For using *other PAPI placeholders in a status*: Ensure the placeholder itself is valid (e.g., `%vault_eco_balance%`) and the originating plugin is working.
4.  **`StatusPlugin.placeholders` Permission:** Does the player whose status contains PAPI placeholders (or the player for whom `%tubsstatusplugin_status%` is being parsed, though less likely an issue for the latter) have this permission?
:::

### D. LuckPerms Prefix/Suffix Not Appearing in Status

::: details Symptoms & Checklist
**Symptoms:**
*   `%LP_prefix%` or `%LP_suffix%` in a status message shows as raw text.

**Checklist:**
1.  **LuckPerms Installed & Enabled:** Is LuckPerms on your server and functioning?
2.  **`StatusPlugin.placeholders` Permission:** The player setting the status needs this permission.
3.  **Correct Placeholder Strings:** Ensure you are using exactly `%LP_prefix%` and `%LP_suffix%`.
4.  **Prefix/Suffix Existence:** Does the player actually *have* a prefix and/or suffix set in LuckPerms?
5.  **Plugin Hook:** Check startup logs for "Tub's StatusPlugin will now hook into LuckPerms".
:::

### E. Plugin Not Loading / Errors on Startup

::: details Symptoms & Checklist
**Symptoms:**
*   Tub's Status Plugin not in `/plugins` list.
*   Errors related to `de.tubyoub.statusplugin` in console during server startup.

**Checklist:**
1.  **Java Version:** Ensure your server runs Java 8 or a compatible newer version.
2.  **Server API Version:** `plugin.yml` states `api-version: 1.13`. Ensure your server software is 1.13+.
3.  **Corrupted JAR:** Try re-downloading the plugin JAR.
4.  **Dependencies in `plugins` folder:** If soft dependencies like PlaceholderAPI or LuckPerms are intended to be used, ensure their JARs are also in the `plugins` folder.
5.  **`config.yml` Syntax (Severe):** A completely broken `config.yml` could prevent loading. Back it up, delete it, and let the plugin regenerate a default one to test.
:::

## 3. Providing Information for Support 🆘

If you're still facing issues, please join our [community discord](https://discord.pluginz.dev) for assistance!

To help us help you, please provide:

*   **Tub's Status Plugin Version:** (e.g., `1.6`)
*   **Server Software & Version:** (e.g., Paper 1.20.1, Spigot 1.19.4)
*   **Java Version:** (Output of `java -version` from your server's environment)
*   **List of other plugins:** (Output of `/plugins`)
*   **Your `config.yml` for Tub's Status Plugin.** (Use a service like [Pastebin](https://pastebin.com/))
*   **Relevant Console Logs:** With errors or relevant messages, especially with `loggerLevel: 10`. (Use [mclo.gs](https://mclo.gs/) for long logs).
*   **Clear Description of the Issue:** What you expect vs. what happens.
*   **Steps to Reproduce the issue.**

The more details, the better!