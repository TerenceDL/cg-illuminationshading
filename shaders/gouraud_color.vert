#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform float material_shininess; // n
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;

void main() {

    vec3 frag_pos = vec3(model_matrix * vec4(vertex_position,1.0));
    mat3 normal_matrix =inverse(transpose(mat3(model_matrix))); //convert to 3x3 matrix 
    vec3 frag_normal = normalize(normal_matrix * vertex_normal);
    //ambient
   ambient = light_ambient;
   //diffuse
    vec3 L = normalize(light_position - frag_pos); //light dirention 
    vec3 N = normalize(frag_normal);
    float diff = max(dot(N, L), 0.0);
    vec3 diffuse_light = diff * light_color;
   diffuse = diffuse_light;
  //specular
    vec3 view_direction = normalize(camera_position - frag_pos);
    vec3 R = normalize(-reflect(L, N)); 
    float spec = pow(max(dot(view_direction, R), 0.0),material_shininess);
    vec3 specular_light = spec * light_color; 
    specular = specular_light;


    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
}