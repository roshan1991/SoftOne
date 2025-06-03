using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Task_Management_Application_API.Migrations
{
    /// <inheritdoc />
    public partial class tonadd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "token",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "token",
                table: "Users");
        }
    }
}
