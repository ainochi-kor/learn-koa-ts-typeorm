import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Delete,
  Patch,
} from "routing-controllers";

@Controller("/users")
export class UsersController {
  @Get()
  getAllUsers() {
    return "Get all users";
  }

  @Get("/:id")
  getUser(@Param("id") id: number) {
    return `Get user with id ${id}`;
  }

  @Post()
  createUser(@Body() user: any) {
    return `Create user with name ${user.name}`;
  }

  @Patch("/:id")
  updateUser(@Param("id") id: number, @Body() user: any) {
    return `Update user with id ${id} to name ${user.name}`;
  }

  @Delete("/:id")
  deleteUser(@Param("id") id: number) {
    return `Delete user with id ${id}`;
  }
}
