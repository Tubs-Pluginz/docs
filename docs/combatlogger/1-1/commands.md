# Commands Reference 💻

BT's CombatLogger uses the base command `/combatlogger`, with a convenient alias `/cl`.

::: tip Permissions Matter!
Access to most subcommands is controlled by permissions. Players will only see commands they have permission for in `/cl help`.
:::

## Main Command: `/combatlogger` (Alias: `/cl`)

### `/cl help`
*   **Description:** Displays a list of CombatLogger commands that the executing player has permission to use.
*   **Permission:** `combatlogger.help` (Default: `true` - all players)
*   **Usage:** `/cl help`

### `/cl info`
*   **Description:** Shows information about the BT's CombatLogger plugin, including version, author, and links to GitHub/Discord. If `checkVersion` is enabled and the user has appropriate permissions (implicitly admin-like for this specific info), it may indicate if an update is available.
*   **Permission:** `combatlogger.info` (Default: `true` - all players)
*   **Usage:** `/cl info`

### `/cl list`
*   **Description:** Lists all players currently tagged as "in combat" on the server.
*   **Permission:** `combatlogger.list` (Default: `op`)
*   **Usage:** `/cl list`
*   **Output:**
    *   If players are in combat: "Players currently in combat: PlayerA, PlayerB..."
    *   If no players are in combat: "There are currently no players in Combat"

### `/cl settime [seconds]`
*   **Description:** Gets or sets the global combat tag duration.
*   **Permission:** `combatlogger.settimer` (Default: `op`)
*   **Usage:**
    *   To get current time: `/cl settime`
        *   Output: "Current combat timer: `X` seconds."
    *   To set a new time: `/cl settime <seconds>`
        *   `<seconds>`: A positive integer representing the new combat duration.
        *   Output: "Combat timer set to `Y` seconds." or an error if input is invalid.
    *   **Example:** `/cl settime 45` (sets combat tag to 45 seconds)

### `/cl start <player>`
*   **Description:** Manually tags the specified `<player>` as "in combat", starting their combat timer.
*   **Permission:** `combatlogger.start` (Default: `op`)
*   **Arguments:**
    *   `<player>`: (Required) The name of an online player.
*   **Usage Example:** `/cl start Notch`
*   **Output:** "Combat started for `Notch`."

### `/cl stop <player>`
*   **Description:** Manually removes the combat tag from the specified `<player>`, effectively ending their combat timer immediately.
*   **Permission:** `combatlogger.stop` (Default: `op`)
*   **Arguments:**
    *   `<player>`: (Required) The name of an online player.
*   **Usage Example:** `/cl stop Herobrine`
*   **Output:** "Combat stopped for `Herobrine`."

### `/cl ally <add|remove|accept|deny> <player>`
*   **Description:** Manages player alliances. Allies will not trigger combat tags when hitting each other.
*   **Permission:** `combatlogger.ally` (Default: `true` - all players)
*   **Subcommands:**
    *   #### `/cl ally add <player>`
        *   **Action:** Sends an ally request to the specified `<player>`. The target player has 30 seconds to accept.
        *   **Output (Sender):** "Send ally request to `<player>`."
        *   **Output (Target):** "`<SenderName>` wants to add you as an ally. [Accept] [Deny]" (clickable)
    *   #### `/cl ally remove <player>`
        *   **Action:** Removes the specified `<player>` from your list of allies (and you from theirs).
        *   **Output (Sender):** "Removed `<player>` as an ally."
        *   **Output (Target):** "`<SenderName>` has removed you as an ally."
    *   #### `/cl ally accept <player>`
        *   **Action:** Accepts a pending ally request from the specified `<player>`.
        *   **Output (Sender - who accepted):** "You have accepted the ally request from `<player>`."
        *   **Output (Requester):** "`<AccepterName>` has accepted your ally request."
        *   **Error:** "There is no active ally request from `<player>`." if no valid request exists.
    *   #### `/cl ally deny <player>`
        *   **Action:** Denies a pending ally request from the specified `<player>`.
        *   **Output (Sender - who denied):** "You have denied the ally request from `<player>`."
        *   **Output (Requester):** "`<DenierName>` has denied your ally request."
*   **Notes:**
    *   This command can only be used by players.
    *   Player names are case-sensitive for targeting.

### `/cl reload`
*   **Description:** Reloads the plugin's `config.yml` and `allies.yml` files.
*   **Permission:** `combatlogger.reload` (Default: `op`)
*   **Usage:** `/cl reload`
*   **Output:** "Reloaded config and Allys successfully"
