using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProEventos.Persistence.Migrations
{
    public partial class Alterandocolunas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "Funcao",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "Funcao",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "ImageURL",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "Funcao",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "Funcao",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "ImageURL",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false);
        }
    }
}
