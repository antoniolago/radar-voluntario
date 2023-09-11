using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RadarVoluntario.Domain.Migrations
{
    /// <inheritdoc />
    public partial class AddrefreshTokenstableargument : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RefreshToken_accounts_AccountId",
                table: "RefreshToken");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RefreshToken",
                table: "RefreshToken");

            migrationBuilder.RenameTable(
                name: "RefreshToken",
                newName: "refreshTokens");

            migrationBuilder.RenameIndex(
                name: "IX_RefreshToken_AccountId",
                table: "refreshTokens",
                newName: "IX_refreshTokens_AccountId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_refreshTokens",
                table: "refreshTokens",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_refreshTokens_accounts_AccountId",
                table: "refreshTokens",
                column: "AccountId",
                principalTable: "accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_refreshTokens_accounts_AccountId",
                table: "refreshTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_refreshTokens",
                table: "refreshTokens");

            migrationBuilder.RenameTable(
                name: "refreshTokens",
                newName: "RefreshToken");

            migrationBuilder.RenameIndex(
                name: "IX_refreshTokens_AccountId",
                table: "RefreshToken",
                newName: "IX_RefreshToken_AccountId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RefreshToken",
                table: "RefreshToken",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshToken_accounts_AccountId",
                table: "RefreshToken",
                column: "AccountId",
                principalTable: "accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
