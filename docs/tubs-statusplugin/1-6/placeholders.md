# PlaceholderAPI Integration 🔗

Tub's Status Plugin offers integration with [PlaceholderAPI (PAPI)](https://www.spigotmc.org/resources/placeholderapi.6245/) to allow displaying player statuses in other plugins and using other PAPI placeholders within status messages themselves.

::: tip PlaceholderAPI Required!
For any of these features to work, you **must** have PlaceholderAPI installed on your server. The plugin will log to the console if PlaceholderAPI is found and hooked.
:::

## Placeholders Provided by Tub's Status Plugin

Once Tub's Status Plugin is running and PlaceholderAPI is detected, the following placeholders become available for use in any other plugin that supports PAPI (e.g., chat formatters, scoreboards, tab plugins):

*   ### `%tubsstatusplugin_status%`
    *   **Description:** Displays the current status of the player for whom the placeholder is being parsed. The status will be color-translated but will not include the opening/closing brackets.
    *   **Example Usage (in another plugin's config):**
        `Player Status: %tubsstatusplugin_status%`
    *   **Output:** If the player "Notch" has status "&aOnline", this would show "Player Status: Online" (with green color). If no status, it returns an empty string.

*   ### `%tubsstatusplugin_status_<playerName>%`
    *   **Description:** Displays the current status of the specified `<playerName>`.
    *   **Parameters:**
        *   `<playerName>`: Replace this with the exact name of an online player.
    *   **Example Usage:**
        `Notch's Status: %tubsstatusplugin_status_Notch%`
    *   **Output:** If Notch has status "&cAFK", this shows "Notch's Status: AFK" (with red color). Returns empty if the target player is not found or has no status.

::: info Parsing
Remember that the plugin where you *use* these placeholders is responsible for parsing them via PlaceholderAPI. Tub's Status Plugin simply provides the data.
:::

## Using Other PAPI Placeholders Within Statuses

If PlaceholderAPI is present on your server, players with the `StatusPlugin.placeholders` permission can embed *other* PAPI placeholders directly into their status messages set via `/status <message>`.

*   **Permission Required:** `StatusPlugin.placeholders` (Default: `op`)
*   **How it Works:**
    1.  A player sets their status including a PAPI placeholder:
        `/status Currently playing on %server_name% with %server_online% players!`
    2.  When Tub's Status Plugin displays this status (in tab, above head, in chat), it will ask PlaceholderAPI to parse the placeholders within the status string.
*   **Example:**
    If a player sets their status as `My balance: %vault_eco_balance_formatted%`, and they have $1,000, their displayed status (e.g., in tab) might become `[My balance: $1,000.00]`.
*   **Refresh Rate:** The plugin updates player display names (which includes parsing these placeholders) in the tab list periodically (every 30 seconds by default, if `changeTablistNames: true`). For chat messages, placeholders are parsed at the time the message is sent.

## LuckPerms Prefix/Suffix Integration (via Status Messages)

If [LuckPerms](https://luckperms.net/) is present and the player has the `StatusPlugin.placeholders` permission, special non-PAPI placeholders can be used in their status messages to display their LuckPerms prefixes/suffixes:

*   `%LP_prefix%`: Replaced by the player's active LuckPerms prefix.
*   `%LP_suffix%`: Replaced by the player's active LuckPerms suffix.

*   **Permission Required:** `StatusPlugin.placeholders` (Default: `op`)
*   **Example Status:** `/status %LP_prefix%&r &7MyRank &f%LP_suffix%`
    *   This might display as `[[Admin] PlayerName [Staff]]` if their prefix is `[Admin] ` and suffix is ` [Staff]`.
*   **Note:** These are specific to Tub's Status Plugin's handling and are not standard PAPI placeholders. They are processed by `StatusManager` when `updateDisplayName` is called.

By combining these integrations, players and server owners can create highly dynamic and informative status messages.