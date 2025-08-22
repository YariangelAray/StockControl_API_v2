import Elemento from "../models/Elemento.js";
import TipoElemento from "../models/TipoElemento.js";
import Estado from "../models/Estado.js";
import Ambiente from "../models/Ambiente.js";
import Inventario from "../models/Inventario.js";

class ElementoService {

  static objElemento = new Elemento();
  static objTipoElemento = new TipoElemento();
  static objEstado = new Estado();
  static objAmbiente = new Ambiente();
  static objInventario = new Inventario();

  static async getAllElementos() {
    try {

      // Llamamos el método listar
      const elementos = await this.objElemento.getAll();

      // Validamos si no hay elementos
      if (!elementos) {
        return {error: true, code: 404, message: "No hay elementos registrados"};
      }
      // Retornamos los elementos obtenidos
      return {
        error: false, code: 200, message: "Elementos obtenidos correctamente",
        data: await this.complementarElementos(elementos)
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: `Error al obtener los elementos: ${error.message}` };
    }
  }

  static async getElementoById(id) {
    try {

      // Llamamos el método consultar por ID
      const elemento = await this.objElemento.getById(id);
      // Validamos si no hay elemento
      if (!elemento) {
        return {error: true, code: 404, message: "Elemento no encontrado"};
      }
      // Retornamos el elemento obtenido
      return {
        error: false, code: 200, message: "Elemento obtenido correctamente",
        data: await this.complementarElemento(elemento)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener el elemento: ${error.message}` };
    }
  }

  static async createElemento(elemento) {
    try {

      if (elemento.tipo_elemento_id) {
        const tipoExistente = this.objTipoElemento.getById(elemento.tipo_elemento_id);
        if (!tipoExistente)
          return { error: true, code: 404, message: "El tipo de elemento especificado no existe." };
      }
      if (elemento.estado_id) {
        const estadoExistente = this.objEstado.getById(elemento.estado_id);
        if (!estadoExistente)
          return { error: true, code: 404, message: "El estado especificado no existe." };
      }
      if (elemento.ambiente_id) {
        const ambienteExistente = this.objAmbiente.getById(elemento.ambiente_id);
        if (!ambienteExistente)
          return { error: true, code: 404, message: "El ambiente especificado no existe." };
      }
      if (elemento.inventario_id) {
        const inventarioExistente = this.objInventario.getById(elemento.inventario_id);
        if (!inventarioExistente)
          return { error: true, code: 404, message: "El inventario especificado no existe." };
      }
      
      if (await this.objElemento.getByPlaca(elemento.placa)) 
        return { error: true, code: 409, message: "El número de placa especificado ya existe." };

      if (elemento.serial && await this.objElemento.getBySerial(elemento.serial)) 
        return { error: true, code: 409, message: "El número de placa especificado ya existe." };
        
      
      // Llamamos el método crear
      const elementoCreado = await this.objElemento.create(elemento);
      // Validamos si no se pudo crear el elemento
      if (elementoCreado === null) {
        return {error: true, code: 400, message: "Error al crear el elemento"};
      }
      // Retornamos el elemento creado
      return {
        error: false, code: 201, message: "Elemento creado correctamente",
        data: await this.complementarElemento(elementoCreado)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al crear el elemento: ${error.message}` };
    }
  }

  static async updateElemento(id, elemento) {
    try {
    
      // Llamamos el método consultar por ID
      const existente = await this.objElemento.getById(id);
      // Validamos si el elemento existe
      if (!existente) {
        return {error: true, code: 404, message: "Elemento no encontrado"};
      }
      
      if (elemento.tipo_elemento_id) {
        const tipoExistente = this.objTipoElemento.getById(elemento.tipo_elemento_id);
        if (!tipoExistente)
          return { error: true, code: 404, message: "El tipo de elemento especificado no existe." };
      }
      if (elemento.estado_id) {
        const estadoExistente = this.objEstado.getById(elemento.estado_id);
        if (!estadoExistente)
          return { error: true, code: 404, message: "El estado especificado no existe." };
      }
      if (elemento.ambiente_id) {
        const ambienteExistente = this.objAmbiente.getById(elemento.ambiente_id);
        if (!ambienteExistente)
          return { error: true, code: 404, message: "El ambiente especificado no existe." };
      }
      if (elemento.inventario_id) {
        const inventarioExistente = this.objInventario.getById(elemento.inventario_id);
        if (!inventarioExistente)
          return { error: true, code: 404, message: "El inventario especificado no existe." };
      }

      const existentePlaca = await this.objElemento.getByPlaca(elemento.placa);
      if (existentePlaca && elemento.placa != existente.placa) {
        return { error: true, code: 409, message: "El número de placa especificado ya existe." };    
      }

      const existenteSerial = await this.objElemento.getBySerial(elemento.serial);
      if (existenteSerial && elemento.serial != existente.serial) {
        return { error: true, code: 409, message: "El número de placa especificado ya existe." };    
      }

      // Llamamos el método actualizar
      const elementoActualizado = await this.objElemento.update(id, elemento);
      // Validamos si no se pudo actualizar el elemento
      if (elementoActualizado === null) {
        return {error: true, code: 400, message: "Error al actualizar el elemento"};
      }
      // Retornamos el elemento actualizado
      return {
        error: false, code: 200, message: "Elemento actualizado correctamente",
        data: await this.complementarElemento(elementoActualizado)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al actualizar el elemento: ${error.message}` };
    }
  }

  static async deleteElemento(id) {
    try {

      // Llamamos el método consultar por ID
      const elemento = await this.objElemento.getById(id);
      // Validamos si el elemento existe
      if (!elemento) {
        return {error: true, code: 404, message: "Elemento no encontrado"};
      }

      // Llamamos el método eliminar
      const elementoEliminado = await this.objElemento.delete(id);
      // Validamos si no se pudo eliminar el elemento
      if (!elementoEliminado) {
        return {error: true, code: 400, message: "Error al eliminar el elemento"};
      }

      // Retornamos el elemento eliminado
      return {error: false, code: 200, message: "Elemento eliminado correctamente"};
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {error: true, code: 500, message: `Error al eliminar el elemento: ${error.message}`};
    }
  }

  static async getElementosByInventarioId(inventarioId) {
    try {

      // Llamamos el método listar
      const elementos = await this.objElemento.getAllByInventarioId(inventarioId);

      // Validamos si no hay elementos
      if (!elementos) {
        return { error: true, code: 404, message: "No hay elementos registrados para el inventario con ID " + inventarioId};
      }
      // Retornamos los elementos obtenidos
      return {
        error: false, code: 200, message: `Elementos del inventario con ID ${inventarioId} obtenidos correctamente`,
        data: await this.complementarElementos(elementos)
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: `Error al obtener los elementos del inventario con ID ${inventarioId}: ${error.message}` };
    }
  }

  static async complementarElementos(elementos) {
    return Promise.all(await elementos.map(async elemento => await this.complementarElemento(elemento)))
  }

  static async complementarElemento(elemento) {
    const ambiente = await this.objAmbiente.getById(elemento.ambiente_id);
    const estado = await this.objElemento.getById(elemento.estado_id);
    const tipoElemento = await this.objElemento.getById(elemento.tipo_elemento_id);

    elemento.ambiente = ambiente.nombre;
    elemento.estado = estado.nombre;
    elemento.tipoElemento = tipoElemento.nombre;

    return elemento;
  }
}

export default ElementoService;