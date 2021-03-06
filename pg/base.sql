PGDMP     '    0    	            x            taskManagerDB    11.3    11.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                       1262    16411    taskManagerDB    DATABASE     �   CREATE DATABASE "taskManagerDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE "taskManagerDB";
             postgres    false            �            1259    16412 	   employees    TABLE     	  CREATE TABLE public.employees (
    name character varying(20) NOT NULL,
    surname character varying(20) NOT NULL,
    login character varying(20),
    email character varying(30),
    password character varying(30) NOT NULL,
    id character varying NOT NULL
);
    DROP TABLE public.employees;
       public         postgres    false            �            1259    16437    employees_in_projects    TABLE     �   CREATE TABLE public.employees_in_projects (
    employee_id character varying(20) NOT NULL,
    project_id character varying NOT NULL
);
 )   DROP TABLE public.employees_in_projects;
       public         postgres    false            �            1259    16417    projects    TABLE     �   CREATE TABLE public.projects (
    name character varying(20) NOT NULL,
    "creatorId" character varying(20) NOT NULL,
    id character varying NOT NULL,
    "aimOfTheProject" text
);
    DROP TABLE public.projects;
       public         postgres    false            �            1259    16422    tasks    TABLE     Y  CREATE TABLE public.tasks (
    text character varying(300),
    status character varying(20) NOT NULL,
    creator character varying(20) NOT NULL,
    colour character varying(20),
    "assigned to" character varying(20),
    id character varying NOT NULL,
    project_id character varying NOT NULL,
    "startTime" date,
    "endTime" date
);
    DROP TABLE public.tasks;
       public         postgres    false                      0    16412 	   employees 
   TABLE DATA                     public       postgres    false    196   p                 0    16437    employees_in_projects 
   TABLE DATA                     public       postgres    false    199   Z                 0    16417    projects 
   TABLE DATA                     public       postgres    false    197   t                 0    16422    tasks 
   TABLE DATA                     public       postgres    false    198   �       �
           2606    16515 0   employees_in_projects employees_in_projects_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.employees_in_projects
    ADD CONSTRAINT employees_in_projects_pkey PRIMARY KEY (project_id);
 Z   ALTER TABLE ONLY public.employees_in_projects DROP CONSTRAINT employees_in_projects_pkey;
       public         postgres    false    199            �
           2606    16500    employees pr_id 
   CONSTRAINT     M   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT pr_id PRIMARY KEY (id);
 9   ALTER TABLE ONLY public.employees DROP CONSTRAINT pr_id;
       public         postgres    false    196            �
           2606    16522    projects pr_key 
   CONSTRAINT     M   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT pr_key PRIMARY KEY (id);
 9   ALTER TABLE ONLY public.projects DROP CONSTRAINT pr_key;
       public         postgres    false    197            �
           2606    16537    tasks tasks_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public         postgres    false    198            �
           2606    16543    tasks fk_df    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_df FOREIGN KEY ("assigned to") REFERENCES public.employees(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 5   ALTER TABLE ONLY public.tasks DROP CONSTRAINT fk_df;
       public       postgres    false    2700    196    198            �
           2606    16548    tasks fk_dfg    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_dfg FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 6   ALTER TABLE ONLY public.tasks DROP CONSTRAINT fk_dfg;
       public       postgres    false    2702    197    198            �
           2606    16516    employees_in_projects fk_emp_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.employees_in_projects
    ADD CONSTRAINT fk_emp_id FOREIGN KEY (employee_id) REFERENCES public.employees(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public.employees_in_projects DROP CONSTRAINT fk_emp_id;
       public       postgres    false    2700    196    199            �
           2606    16523    projects fk_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT fk_id FOREIGN KEY ("creatorId") REFERENCES public.employees(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 8   ALTER TABLE ONLY public.projects DROP CONSTRAINT fk_id;
       public       postgres    false    196    197    2700            �
           2606    16538    tasks fk_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_id FOREIGN KEY (creator) REFERENCES public.employees(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 5   ALTER TABLE ONLY public.tasks DROP CONSTRAINT fk_id;
       public       postgres    false    2700    196    198            �
           2606    16528    employees_in_projects fk_pr_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.employees_in_projects
    ADD CONSTRAINT fk_pr_id FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 H   ALTER TABLE ONLY public.employees_in_projects DROP CONSTRAINT fk_pr_id;
       public       postgres    false    197    199    2702               �  x���MKQ�����Sa��>iSB����A��$کE3��
Z�d30~��s�Q��qZ�����{�g����fs��I�es�cVoj�QL蕺Y��u�ŪjEW��l��V6�
�+�a*��Z�E�QR�Q���ã�L�Ţ0���\G�>��0��f5�Z�4�}�e�1Q�U��L�i	0���~$���ψ��-~+ 6�A�9�R�j��Jo[	����H����C�a��1LU�MK�C5;�3��	��a 7%>�n"�PK�7�
���HXvK�=�� �,0�_�6e��,�a������%��z�;Ҕ�`�;4�~ ��xa�ܕh�T$��{�-�����aMnH�����6�j��!9��?��
�MIYq�FM@ӿ��'��{MFYI��c���~��pz�
�w䙑������R�=y�QD�"&��r�IL�����TS�Tc���y�D~ ���         
   x���             
   x���             
   x���         